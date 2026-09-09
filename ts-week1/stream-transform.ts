import { Transform } from "node:stream";

// ۱. ساخت یک Transform Stream برای تبدیل تمام حروف متنی به حروف بزرگ
const upperCaseTransform = new Transform({
  transform(chunk, encoding, callback) {
    // تبدیل تکه داده (Buffer) به رشته و تبدیل به حروف بزرگ
    const upperChunk = chunk.toString().toUpperCase();
    
    // ارسال داده تغییریافته به مرحله بعدی
    this.push(upperChunk);
    
    // اعلام پایان پردازش این Chunk
    callback();
  },
});

// ۲. فرستادن داده از ورودی استاندارد (محیط متنی) به Transform و سپس به خروجی ترمینال
process.stdin.pipe(upperCaseTransform).pipe(process.stdout);

console.log("📝 یک متن انگلیسی بنویس و Enter بزن (برای خروج Ctrl+C بزن):");
