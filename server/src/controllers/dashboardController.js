const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getStats = async (req, res) => {
    try {
        const totalEmployees = await prisma.employee.count();
        const recentEmployees = await prisma.employee.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' }
        });
        res.json({ totalEmployees, recentEmployees });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getStats };
