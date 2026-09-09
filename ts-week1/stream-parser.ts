import fs from "fs";
import path from "path";
import { z } from "zod";

// ۱. تعریف Schema برای هر رکورد کاربر
const UserSchema = z.object({
  id: z.number().positive(),
  username: z.string().min(3),
  email: z.string().email("ایمیل نامعتبر است"),
  role: z.enum(["admin", "user", "guest"]),
  age: z.number().min(18, "سن باید حداقل ۱۸ باشد"),
  phoneNumber: z.string().min(10, "شماره تلفن باید حداقل ۱۰ رقم باشد"),
});

type User = z.infer<typeof UserSchema>;

// ۲. ساخت تابع پردازش فایل با Stream
function processFileWithStream(filePath: string) {
  let rawData = "";

  // ایجاد ReadStream برای خواندن تکه‌تکه‌ای فایل از دیسک
  const readableStream = fs.createReadStream(filePath, {
    encoding: "utf-8",
    highWaterMark: 64, // اندازه‌گیری تکه‌ها به بایت (برای شبیه‌سازی Stream)
  });

  console.log("🔄 در حال خواندن فایل به صورت Stream...\n");

  // دریافت تکه‌های داده (Chunks)
  readableStream.on("data", (chunk) => {
    rawData += chunk;
    console.log(`📦 دریافت یک Chunk داده (اندازه: ${chunk.length} بایت)`);
  });

  // پایان خواندن فایل
  readableStream.on("end", () => {
    console.log("\n✅ خواندن فایل تمام شد. شروع اعتبارسنجی با Zod...\n");

    try {
      const users: unknown[] = JSON.parse(rawData);

      let validCount = 0;
      let invalidCount = 0;

      users.forEach((userRaw, index) => {
        const result = UserSchema.safeParse(userRaw);

        if (result.success) {
          validCount++;
          console.log(`[کاربر ${index + 1}] ✅ معتبر: ${result.data.username}`);
        } else {
          invalidCount++;
          console.log(`[کاربر ${index + 1}] ❌ نامعتبر:`);
          console.log(JSON.stringify(result.error.format(), null, 2));
        }
      });

      console.log("\n-----------------------------------");
      console.log(`📊 خلاصه گزارش: ${validCount} رکورد سالم | ${invalidCount} رکورد خراب`);
      console.log("-----------------------------------");
    } catch (error) {
      console.error("خطا در پارس کردن JSON:", error);
    }
  });

  // مدیریت خطاهای احتمالی فایل (مثلا نبودن فایل)
  readableStream.on("error", (err) => {
    console.error("❌ خطای خواندن فایل:", err.message);
  });
}

// اجرای پردازشگر روی فایل data.json
const jsonPath = path.join(__dirname, "data.json");
processFileWithStream(jsonPath);
