import {loginSchema} from "../../../../../schemas/loginSchema";
import {prisma} from "../../../../lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    const body = await req.json();

    const parsedData = loginSchema.safeParse(body);
    if (!parsedData.success) {
        const messages = parsedData.error.errors.map((err) => err.message);
        console.log("Validation Error:", messages);
        return new Response(JSON.stringify({ error: messages }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }
    const { email, password } = parsedData.data;
    const user = await prisma.user.findUnique({ where: { email } });

    // if (!user || !(await bcrypt.compare(password, user.password))) {
    //   return new Response(JSON.stringify({ error: "Invalid credentials" }), {
    //     status: 401,
    //   });
    // }
    if (!user || password !== user.password) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), {
        status: 401,
      });
    }

    // Store session or JWT here (for now, respond with role and userId)
    return Response.json({ userId: user.id, role: user.role });
}