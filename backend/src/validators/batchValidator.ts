import { prisma } from "../../lib/prisma.js";

const existing = await prisma.product.findUnique({
   where: {
      
   }
})
