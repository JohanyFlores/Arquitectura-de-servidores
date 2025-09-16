const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;

// Aquí importas los datos. Asegúrate de que este archivo contiene el JSON
const employees = require('./employees.json');

// Middleware para parsear JSON en el cuerpo de las peticiones
app.use(express.json());

// Middleware personalizado para logging
app.use((req, res, next) => {
    console.log(`Petición recibida en: ${req.method} ${req.url}`);
    next(); // Permite que la petición continúe
});

// --- Manejadores de rutas ---

// Ruta 1 y 8: Rutas específicas que van primero
app.get('/api/employees/oldest', (req, res) => {
    if (employees.length === 0) {
        return res.status(404).json({ code: 'not_found' });
    }
    const oldestEmployee = employees.reduce((oldest, current) => {
        return (current.age > oldest.age) ? current : oldest;
    }, employees[0]);
    res.json(oldestEmployee);
});

app.get('/api/employees/:name', (req, res) => {
    const employeeName = req.params.name;
    const employee = employees.find(emp => emp.name === employeeName);

    if (employee) {
        res.json(employee);
    } else {
        res.status(404).json({ code: 'not_found' });
    }
});

// Rutas 1, 2, 5 y 7: Ruta genérica con manejo de query parameters
app.get('/api/employees', (req, res) => {
    const { page, user, badges } = req.query;
    let filteredEmployees = employees;

    if (page) {
        const pageNum = parseInt(page);
        if (isNaN(pageNum) || pageNum <= 0) {
            return res.status(400).json({ code: 'bad_request' });
        }
        const start = (pageNum - 1) * 2;
        filteredEmployees = employees.slice(start, start + 2);
    } else if (user === 'true') {
        filteredEmployees = employees.filter(emp => emp.privileges === 'user');
    } else if (badges) {
        filteredEmployees = employees.filter(emp => emp.badges && emp.badges.includes(badges));
    }


    res.json(filteredEmployees);
});


// Ruta 6: Añadir un nuevo empleado
app.post('/api/employees', (req, res) => {
    const newEmployee = req.body;
    
    const requiredKeys = ['name', 'age', 'phone', 'privileges', 'favorites', 'finished', 'badges', 'points'];
    const hasValidKeys = requiredKeys.every(key => newEmployee.hasOwnProperty(key));
    
    if (!hasValidKeys) {
      return res.status(400).json({ code: 'bad_request' });
    }
    
    employees.push(newEmployee);
    res.status(201).json(newEmployee);
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});