"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const user = await prisma.user.upsert({
        where: { email: 'admin@autoreply.ai' },
        update: {},
        create: {
            email: 'admin@autoreply.ai',
            password: 'hashed_password_here', // In a real app this would be properly hashed
            role: 'BUSINESS_OWNER',
            business: {
                create: {
                    name: 'Demo Business',
                    description: 'A demo restaurant for AutoReply AI',
                    faq: 'Q: What are your hours?\nA: 9 AM to 10 PM daily.',
                    products: 'Pizza, Pasta, Salad',
                    plan: 'PRO'
                }
            }
        }
    });
    console.log({ user });
}
main()
    .then(async () => {
    await prisma.$disconnect();
})
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
