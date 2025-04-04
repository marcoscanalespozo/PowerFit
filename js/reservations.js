// Reservation system functionality
class ReservationSystem {
    constructor() {
        this.reservations = JSON.parse(localStorage.getItem('gymReservations')) || [];
        this.users = JSON.parse(localStorage.getItem('gymUsers')) || [
            { id: 1, name: "Admin", email: "admin@powerfit.com", password: "admin123", type: "admin" },
            { id: 2, name: "Usuario Demo", email: "user@demo.com", password: "demo123", type: "member" }
        ];
        this.classes = JSON.parse(localStorage.getItem('gymClasses')) || [];
        this.currentUser = null;
    }
    
    // Initialize the system
    init() {
        if (this.classes.length === 0) {
            this.initializeSampleData();
        }
        
        this.checkLoginStatus();
        this.setupEventListeners();
    }
    
    // Create sample data if none exists
    initializeSampleData() {
        this.classes = [
            { id: 1, name: "Yoga Matutino", description: "Clase de yoga para todos los niveles", capacity: 15 },
            { id: 2, name: "CrossFit", description: "Entrenamiento funcional de alta intensidad", capacity: 12 },
            { id: 3, name: "Spinning", description: "Clase de ciclismo indoor con música motivacional", capacity: 20 },
            { id: 4, name: "Pilates", description: "Mejora tu postura y flexibilidad", capacity: 10 },
            { id: 5, name: "Boxeo", description: "Entrenamiento de boxeo sin contacto", capacity: 8 },
            { id: 6, name: "Zumba", description: "Baile y ejercicio combinados", capacity: 25 }
        ];
        
        localStorage.setItem('gymClasses', JSON.stringify(this.classes));
    }
    
    // Check if user is logged in
    checkLoginStatus() {
        const loggedInUser = localStorage.getItem('gymCurrentUser');
        if (loggedInUser) {
            this.currentUser = JSON.parse(loggedInUser);
            this.updateUIForLoggedInUser();
        }
    }
    
    // Update UI when user logs in
    updateUIForLoggedInUser() {
        const loginButton = document.querySelector('.navbar .btn[data-bs-target="#loginModal"]');
        if (loginButton && this.currentUser) {
            loginButton.innerHTML = `<i class="fas fa-user"></i> ${this.currentUser.name}`;
            loginButton.setAttribute('data-bs-target', '#userDropdown');
            
            // Create user dropdown menu
            this.createUserDropdown();
        }
    }
    
    // Create user dropdown menu
    createUserDropdown() {
        const navbar = document.querySelector('.navbar-collapse');
        if (!navbar) return;
        
        // Remove existing dropdown if any
        const existingDropdown = document.querySelector('.navbar .nav-item.dropdown');
        if (existingDropdown) {
            existingDropdown.remove();
        }
        
        const dropdownHtml = `
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" 
                   data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="fas fa-user me-1"></i> ${this.currentUser.name}
                </a>
                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                    <li><a class="dropdown-item" href="#"><i class="fas fa-user-circle me-2"></i>Perfil</a></li>
                    <li><a class="dropdown-item" href="#"><i class="fas fa-calendar-alt me-2"></i>Mis Reservas</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="#" id="logoutBtn"><i class="fas fa-sign-out-alt me-2"></i>Cerrar Sesión</a></li>
                </ul>
            </li>
        `;
        
        navbar.querySelector('ul').insertAdjacentHTML('beforeend', dropdownHtml);
    }
    
    // Setup event listeners for reservation system
    setupEventListeners() {
        // Login form submission
        document.getElementById('loginForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });
        
        // Logout button
        document.addEventListener('click', (e) => {
            if (e.target.id === 'logoutBtn') {
                e.preventDefault();
                this.handleLogout();
            }
        });
        
        // Booking form submission
        document.getElementById('bookingForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleBooking();
        });
    }
    
    // Handle user login
    handleLogin() {
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        const user = this.users.find(u => u.email === email && u.password === password);
        
        if (user) {
            this.currentUser = user;
            localStorage.setItem('gymCurrentUser', JSON.stringify(user));
            
            // Update UI
            this.updateUIForLoggedInUser();
            
            // Show success message and close modal
            alert(`Bienvenido, ${user.name}!`);
            bootstrap.Modal.getInstance(document.getElementById('loginModal')).hide();
        } else {
            alert('Email o contraseña incorrectos. Por favor, inténtalo de nuevo.');
        }
    }
    
    // Handle user logout
    handleLogout() {
        this.currentUser = null;
        localStorage.removeItem('gymCurrentUser');
        
        // Reset login button
        const loginButton = document.querySelector('.navbar .btn[data-bs-target="#userDropdown"]');
        if (loginButton) {
            loginButton.innerHTML = '<i class="fas fa-sign-in-alt"></i> Iniciar Sesión';
            loginButton.setAttribute('data-bs-target', '#loginModal');
        }
        
        // Remove dropdown
        const dropdown = document.querySelector('.navbar .nav-item.dropdown');
        if (dropdown) {
            dropdown.remove();
        }
        
        alert('Has cerrado sesión correctamente.');
    }
    
    // Handle class booking
    handleBooking() {
        if (!this.currentUser) {
            alert('Por favor, inicia sesión para reservar una clase.');
            bootstrap.Modal.getInstance(document.getElementById('bookingModal')).hide();
            bootstrap.Modal.getOrCreateInstance(document.getElementById('loginModal')).show();
            return;
        }
        
        const className = document.getElementById('bookingClassName').value;
        const classTime = document.getElementById('bookingClassTime').value;
        const trainer = document.getElementById('bookingClassTrainer').value;
        const notes = document.getElementById('bookingNotes').value;
        
        const newReservation = {
            id: Date.now(),
            userId: this.currentUser.id,
            className,
            classTime,
            trainer,
            notes,
            date: new Date().toISOString(),
            status: 'confirmed'
        };
        
        this.reservations.push(newReservation);
        localStorage.setItem('gymReservations', JSON.stringify(this.reservations));
        
        // Show success message
        alert(`¡Reserva confirmada para ${className} a las ${classTime}!`);
        
        // Close modal
        bootstrap.Modal.getInstance(document.getElementById('bookingModal')).hide();
        
        // In a real app, you would send this data to a server
        console.log('New reservation:', newReservation);
    }
    
    // Get user reservations
    getUserReservations(userId) {
        return this.reservations.filter(r => r.userId === userId);
    }
    
    // Cancel a reservation
    cancelReservation(reservationId) {
        this.reservations = this.reservations.filter(r => r.id !== reservationId);
        localStorage.setItem('gymReservations', JSON.stringify(this.reservations));
    }
}

// Initialize the reservation system when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const reservationSystem = new ReservationSystem();
    reservationSystem.init();
});