// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize data
    initClasses();
    initSchedule();
    initMembers();
    
    // Initialize event listeners
    initEventListeners();
    
    // Remove preloader when everything is loaded
    window.addEventListener('load', function() {
        setTimeout(function() {
            document.querySelector('.preloader').classList.add('fade-out');
            setTimeout(function() {
                document.querySelector('.preloader').style.display = 'none';
            }, 500);
        }, 1000);
    });
});

// Initialize class data and display
function initClasses() {
    const classes = [
        {
            id: 1,
            name: "Yoga Matutino",
            description: "Comienza tu día con energía y flexibilidad con nuestra clase de yoga.",
            image: "images/yoga.jpg",
            level: "Principiante",
            duration: "60 min",
            trainer: "Ana Martínez",
            spots: 15
        },
        {
            id: 2,
            name: "CrossFit Intenso",
            description: "Entrenamiento de alta intensidad que combina fuerza y resistencia.",
            image: "images/crossfit.jpg",
            level: "Avanzado",
            duration: "45 min",
            trainer: "Carlos Rodríguez",
            spots: 10
        },
        {
            id: 3,
            name: "Spinning Energético",
            description: "Clase de ciclismo indoor con música motivacional para quemar calorías.",
            image: "images/spinning.jpg",
            level: "Intermedio",
            duration: "50 min",
            trainer: "Laura Gómez",
            spots: 20
        },
        {
            id: 4,
            name: "Pilates Reformer",
            description: "Mejora tu postura y flexibilidad con máquinas de pilates profesional.",
            image: "images/pilates.jpg",
            level: "Todos los niveles",
            duration: "55 min",
            trainer: "David Sánchez",
            spots: 8
        },
        {
            id: 5,
            name: "Boxeo Fitness",
            description: "Entrenamiento de boxeo sin contacto para mejorar tu condición física.",
            image: "images/boxing.jpg",
            level: "Intermedio",
            duration: "45 min",
            trainer: "Miguel Ángel",
            spots: 12
        },
        {
            id: 6,
            name: "Zumba Party",
            description: "Diversión asegurada con esta clase de baile y ejercicio combinados.",
            image: "images/zumba.jpg",
            level: "Principiante",
            duration: "60 min",
            trainer: "Sofía Ramírez",
            spots: 25
        }
    ];
    
    const classesContainer = document.querySelector('#classes .row');
    
    classes.forEach(cls => {
        const classCol = document.createElement('div');
        classCol.className = 'col-md-4';
        classCol.innerHTML = `
            <div class="card class-card hover-grow">
                <img src="${cls.image}" class="card-img-top" alt="${cls.name}">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <h5 class="card-title mb-0">${cls.name}</h5>
                        <span class="badge bg-primary">${cls.level}</span>
                    </div>
                    <p class="card-text">${cls.description}</p>
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <small class="text-muted"><i class="fas fa-clock me-1"></i> ${cls.duration}</small>
                        <small class="text-muted"><i class="fas fa-user me-1"></i> ${cls.trainer}</small>
                    </div>
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <div class="progress w-100 me-3">
                            <div class="progress-bar" role="progressbar" 
                                 style="width: ${Math.floor(Math.random() * 60) + 40}%" 
                                 aria-valuenow="${cls.spots}" aria-valuemin="0" aria-valuemax="${cls.spots}">
                            </div>
                        </div>
                        <small>${Math.floor(Math.random() * (cls.spots-3)) + 3}/${cls.spots}</small>
                    </div>
                    <button class="btn btn-primary book-class" data-class-id="${cls.id}">Reservar</button>
                </div>
            </div>
        `;
        classesContainer.appendChild(classCol);
    });
}

// Initialize schedule data and display
function initSchedule() {
    const scheduleData = {
        monday: [
            { time: "07:00 - 08:00", class: "Yoga Matutino", trainer: "Ana M." },
            { time: "12:00 - 13:00", class: "Pilates", trainer: "David S." },
            { time: "18:00 - 19:00", class: "CrossFit", trainer: "Carlos R." },
            { time: "19:30 - 20:30", class: "Zumba", trainer: "Sofía R." }
        ],
        tuesday: [
            { time: "07:30 - 08:30", class: "Spinning", trainer: "Laura G." },
            { time: "12:30 - 13:30", class: "Yoga", trainer: "Ana M." },
            { time: "17:30 - 18:30", class: "Boxeo", trainer: "Miguel Á." },
            { time: "19:00 - 20:00", class: "CrossFit", trainer: "Carlos R." }
        ],
        wednesday: [
            { time: "07:00 - 08:00", class: "Yoga Matutino", trainer: "Ana M." },
            { time: "12:00 - 13:00", class: "Pilates", trainer: "David S." },
            { time: "18:00 - 19:00", class: "Funcional", trainer: "Laura G." },
            { time: "19:30 - 20:30", class: "Zumba", trainer: "Sofía R." }
        ],
        thursday: [
            { time: "07:30 - 08:30", class: "Spinning", trainer: "Laura G." },
            { time: "12:30 - 13:30", class: "Yoga", trainer: "Ana M." },
            { time: "17:30 - 18:30", class: "Boxeo", trainer: "Miguel Á." },
            { time: "19:00 - 20:00", class: "CrossFit", trainer: "Carlos R." }
        ],
        friday: [
            { time: "07:00 - 08:00", class: "Yoga Matutino", trainer: "Ana M." },
            { time: "12:00 - 13:00", class: "Pilates", trainer: "David S." },
            { time: "18:00 - 19:00", class: "Funcional", trainer: "Laura G." },
            { time: "19:30 - 20:30", class: "Baile", trainer: "Sofía R." }
        ],
        saturday: [
            { time: "09:00 - 10:00", class: "Spinning", trainer: "Laura G." },
            { time: "11:00 - 12:00", class: "Yoga", trainer: "Ana M." },
            { time: "16:00 - 17:00", class: "CrossFit", trainer: "Carlos R." }
        ]
    };
    
    const scheduleBody = document.querySelector('.schedule-table tbody');
    
    // Find all unique times across all days
    const allTimes = new Set();
    Object.values(scheduleData).forEach(day => {
        day.forEach(session => {
            allTimes.add(session.time);
        });
    });
    
    const sortedTimes = Array.from(allTimes).sort();
    
    // Create rows for each time slot
    sortedTimes.forEach(time => {
        const row = document.createElement('tr');
        row.innerHTML = `<td class="class-time">${time}</td>`;
        
        // Add cells for each day
        ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].forEach(day => {
            const cell = document.createElement('td');
            const session = scheduleData[day].find(s => s.time === time);
            
            if (session) {
                cell.innerHTML = `
                    <div class="class-name">${session.class}</div>
                    <div class="trainer">${session.trainer}</div>
                    <button class="btn btn-primary btn-sm mt-2 book-schedule" 
                            data-class="${session.class}" 
                            data-time="${time}" 
                            data-trainer="${session.trainer}">
                        Reservar
                    </button>
                `;
            }
            
            row.appendChild(cell);
        });
        
        scheduleBody.appendChild(row);
    });
}

// Initialize members data and display
function initMembers() {
    const members = [
        { id: 1, name: "María González", role: "Miembro Premium", image: "images/member1.jpg", since: "2020" },
        { id: 2, name: "Juan Pérez", role: "Miembro VIP", image: "images/member2.jpg", since: "2019" },
        { id: 3, name: "Laura Martínez", role: "Miembro Gold", image: "images/member3.jpg", since: "2021" },
        { id: 4, name: "Carlos Sánchez", role: "Miembro Standard", image: "images/member4.jpg", since: "2022" },
        { id: 5, name: "Ana Rodríguez", role: "Miembro Premium", image: "images/member5.jpg", since: "2020" },
        { id: 6, name: "David López", role: "Miembro Gold", image: "images/member6.jpg", since: "2021" }
    ];
    
    const membersContainer = document.querySelector('.members-grid');
    
    // Display first 6 members
    displayMembers(members.slice(0, 6));
    
    // Load more members button event
    document.getElementById('loadMoreMembers').addEventListener('click', function() {
        // In a real app, you would fetch more data from an API
        const moreMembers = [
            { id: 7, name: "Sofía Ramírez", role: "Entrenadora", image: "images/member7.jpg", since: "2018" },
            { id: 8, name: "Miguel Ángel", role: "Entrenador", image: "images/member8.jpg", since: "2019" },
            { id: 9, name: "Elena Castro", role: "Miembro VIP", image: "images/member9.jpg", since: "2020" }
        ];
        
        displayMembers(moreMembers);
        this.style.display = 'none';
    });
    
    function displayMembers(membersToShow) {
        membersToShow.forEach(member => {
            const memberCol = document.createElement('div');
            memberCol.className = 'col-md-4 col-lg-3';
            memberCol.innerHTML = `
                <div class="card member-card">
                    <img src="${member.image}" class="card-img-top" alt="${member.name}">
                    <div class="card-body">
                        <h5 class="member-name">${member.name}</h5>
                        <p class="member-role">${member.role}</p>
                        <p class="text-muted"><small>Miembro desde ${member.since}</small></p>
                        <div class="member-social">
                            <a href="#"><i class="fab fa-facebook-f"></i></a>
                            <a href="#"><i class="fab fa-instagram"></i></a>
                            <a href="#"><i class="fab fa-twitter"></i></a>
                        </div>
                    </div>
                </div>
            `;
            membersContainer.appendChild(memberCol);
        });
    }
}

// Initialize event listeners
function initEventListeners() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Show/hide back to top button
    window.addEventListener('scroll', function() {
        const backToTop = document.querySelector('.back-to-top');
        if (window.pageYOffset > 300) {
            backToTop.style.display = 'block';
        } else {
            backToTop.style.display = 'none';
        }
    });
    
    // Schedule filter buttons
    document.querySelectorAll('.schedule-filter button').forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            document.querySelectorAll('.schedule-filter button').forEach(b => {
                b.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const day = this.dataset.day;
            filterSchedule(day);
        });
    });
    
    // Class booking buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('book-class') || e.target.classList.contains('book-schedule')) {
            e.preventDefault();
            
            const bookingModal = new bootstrap.Modal(document.getElementById('bookingModal'));
            const classId = e.target.dataset.classId;
            let className, classTime, classTrainer;
            
            if (e.target.classList.contains('book-class')) {
                // Book from class card
                const card = e.target.closest('.card');
                className = card.querySelector('.card-title').textContent;
                classTime = 'Seleccionar horario'; // Would come from a modal to select time
                classTrainer = card.querySelectorAll('.text-muted')[1].textContent.replace(' ', '').replace(' ', '');
            } else {
                // Book from schedule
                className = e.target.dataset.class;
                classTime = e.target.dataset.time;
                classTrainer = e.target.dataset.trainer;
            }
            
            document.getElementById('bookingModalTitle').textContent = `Reservar ${className}`;
            document.getElementById('bookingClassName').value = className;
            document.getElementById('bookingClassTime').value = classTime;
            document.getElementById('bookingClassTrainer').value = classTrainer;
            
            bookingModal.show();
        }
    });
    
    // Booking form submission
    document.getElementById('bookingForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Here you would normally send data to server
        const className = document.getElementById('bookingClassName').value;
        
        // Show success message
        alert(`¡Reserva confirmada para ${className}! Recibirás un correo con los detalles.`);
        
        // Close modal
        const bookingModal = bootstrap.Modal.getInstance(document.getElementById('bookingModal'));
        bookingModal.hide();
    });
    
    // Contact form submission
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Here you would normally send data to server
        alert('Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.');
        this.reset();
    });
    
    // Login form submission
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Here you would normally send data to server
        alert('Inicio de sesión exitoso. Redirigiendo...');
        
        // Close modal
        const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
        loginModal.hide();
    });
}

// Filter schedule by day
function filterSchedule(day) {
    const rows = document.querySelectorAll('.schedule-table tbody tr');
    
    if (day === 'all') {
        rows.forEach(row => row.style.display = '');
        return;
    }
    
    const dayIndex = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].indexOf(day) + 1;
    
    rows.forEach(row => {
        const cell = row.cells[dayIndex];
        if (cell.textContent.trim() === '') {
            row.style.display = 'none';
        } else {
            row.style.display = '';
        }
    });
}