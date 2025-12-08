const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getEmployees = async (req, res) => {
    const { page = 1, limit = 10, search = '' } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    const where = search ? {
        OR: [
            { firstName: { contains: search } },
            { lastName: { contains: search } },
            { email: { contains: search } },
            { department: { contains: search } },
        ]
    } : {};

    try {
        const employees = await prisma.employee.findMany({
            where,
            skip,
            take,
            orderBy: { createdAt: 'desc' }
        });
        const total = await prisma.employee.count({ where });
        res.json({ employees, total, page: parseInt(page), pages: Math.ceil(total / take) });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const createEmployee = async (req, res) => {
    try {
        const employee = await prisma.employee.create({ data: req.body });
        res.status(201).json(employee);
    } catch (error) {
        if (error.code === 'P2002') {
            return res.status(400).json({ message: 'Email already exists' });
        }
        console.error(error);
        res.status(400).json({ message: 'Invalid data' });
    }
};

const updateEmployee = async (req, res) => {
    const { id } = req.params;
    try {
        const employee = await prisma.employee.update({ where: { id }, data: req.body });
        res.json(employee);
    } catch (error) {
        res.status(404).json({ message: 'Employee not found' });
    }
};

const deleteEmployee = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.employee.delete({ where: { id } });
        res.json({ message: 'Employee deleted' });
    } catch (error) {
        res.status(404).json({ message: 'Employee not found' });
    }
};

const getEmployeeById = async (req, res) => {
    const { id } = req.params;
    try {
        const employee = await prisma.employee.findUnique({ where: { id } });
        if (!employee) return res.status(404).json({ message: 'Employee not found' });
        res.json(employee);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = { getEmployees, createEmployee, updateEmployee, deleteEmployee, getEmployeeById };
