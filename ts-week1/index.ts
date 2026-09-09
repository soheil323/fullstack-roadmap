// ۱. تعریف تابع ژنریک برای گرفتن اولین عنصر یک آرایه
function getFirstElement<T>(items: T[]): T | undefined {
  return items[0];
}

// تست ۱: با آرایه‌ای از اعداد
const numbers = [10, 20, 30];
const firstNumber = getFirstElement(numbers); // TypeScript خودکار تشخیص می‌دهد firstNumber از جنس number است
console.log("اولین عدد:", firstNumber);

// تست ۲: با آرایه‌ای از رشته‌ها
const names = ["Soheil", "Ali", "Sara"];
const firstName = getFirstElement(names);
console.log("اولین اسم:", firstName);


// ---------------------------------------------------
// 🎯 بخش چالش شما:
// یک تابع ژنریک به اسم wrapInArray بنویس که:
// - یک ورودی به اسم value از جنس T بگیرد
// - یک آرایه شامل همان تک‌عنصر برگرداند (تایپ خروجی باید T[] باشد)
// ---------------------------------------------------

// کد خود را اینجا بنویسید:
function wrapInArray<T>(value: T): T[] {
  return [value];
}




// تست چالش:
 const wrappedNumber = wrapInArray(42); // خروجی باید [42] باشد
 const wrappedString = wrapInArray("Hello"); // خروجی باید ["Hello"] باشد
 console.log(wrappedNumber, wrappedString);