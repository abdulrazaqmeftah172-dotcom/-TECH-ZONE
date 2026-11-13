// بيانات المنتجات: عدّل الاسم والسعر والقسم والصورة من هنا.
const products = [
 {id:1,name:"هاتف Nova X Pro",category:"هواتف",price:289,oldPrice:329,badge:"الأكثر مبيعاً",desc:"شاشة رائعة وكاميرا عالية الدقة",image:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=700&q=80"},
 {id:2,name:"لابتوب UltraBook 15",category:"لابتوبات",price:749,oldPrice:799,badge:"عرض خاص",desc:"أداء عملي للدراسة والعمل",image:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=700&q=80"},
 {id:3,name:"سماعة لاسلكية Pro",category:"سماعات",price:89,oldPrice:109,badge:"خصم",desc:"صوت واضح وراحة في الاستخدام",image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80"},
 {id:4,name:"ساعة ذكية Active",category:"ساعات",price:119,oldPrice:null,badge:"جديد",desc:"تابع نشاطك وإشعاراتك بسهولة",image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80"},
 {id:5,name:"شاشة عرض 4K",category:"شاشات",price:529,oldPrice:579,badge:"اختيار مميز",desc:"ألوان غنية وتجربة مشاهدة مريحة",image:"https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=700&q=80"},
 {id:6,name:"كاميرا رقمية",category:"إكسسوارات",price:399,oldPrice:null,badge:"مميز",desc:"وثّق لحظاتك بجودة عالية",image:"https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=700&q=80"},
 {id:7,name:"سماعة رأس Gaming",category:"سماعات",price:139,oldPrice:159,badge:"للألعاب",desc:"ميكروفون واضح وراحة طويلة",image:"https://images.unsplash.com/photo-1599669454699-248893623440?auto=format&fit=crop&w=700&q=80"},
 {id:8,name:"لوحة مفاتيح لاسلكية",category:"إكسسوارات",price:59,oldPrice:null,badge:"عملي",desc:"تصميم أنيق واتصال لاسلكي",image:"https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=700&q=80"}
];
// صور الهواتف واللابتوبات أدناه احتياطية لتجنب روابط غير صالحة.
products[0].image = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=700&q=80";
products[1].image = "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=700&q=80";
products[1].image = "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=700&q=80";
products[1].image = "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=700&q=80";

let cart = JSON.parse(localStorage.getItem("techZoneCart") || "[]");
let activeCategory = "الكل";
let searchTerm = "";
const $ = (id) => document.getElementById(id);
const money = (value) => `${value.toLocaleString("en-US")} ر.س`;

function renderProducts(){
  let list = products.filter(p => (activeCategory==="الكل" || p.category===activeCategory) &&
    (p.name+" "+p.category+" "+p.desc).toLowerCase().includes(searchTerm.toLowerCase()));
  const sort = $("sortSelect").value;
  if(sort==="low") list.sort((a,b)=>a.price-b.price);
  if(sort==="high") list.sort((a,b)=>b.price-a.price);
  $("resultsCount").textContent = `عدد المنتجات: ${list.length}`;
  $("emptyState").hidden = list.length>0;
  $("productGrid").innerHTML = list.map(p=>`
    <article class="product-card">
      <div class="product-image"><img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.src='https://placehold.co/600x450/eaf2ff/1264e8?text=TECH+ZONE'"><span class="product-badge">${p.badge}</span></div>
      <div class="product-info"><span class="product-category">${p.category}</span><h3>${p.name}</h3><p class="product-desc">${p.desc}</p>
      <div class="price-row"><div><span class="price">${money(p.price)}</span>${p.oldPrice?`<span class="old-price">${money(p.oldPrice)}</span>`:""}</div><button class="add-btn" data-add="${p.id}" aria-label="أضف ${p.name} إلى السلة">+</button></div></div>
    </article>`).join("");
}
function saveCart(){localStorage.setItem("techZoneCart",JSON.stringify(cart));renderCart();}
function addToCart(id){const item=cart.find(x=>x.id===id);if(item)item.qty++;else cart.push({id,qty:1});saveCart();showToast("تمت إضافة المنتج إلى السلة");}
function renderCart(){
  const count=cart.reduce((s,x)=>s+x.qty,0);$("cartCount").textContent=count;
  const items=cart.map(x=>({...products.find(p=>p.id===x.id),qty:x.qty})).filter(x=>x.id);
  $("cartItems").innerHTML=items.length?items.map(p=>`
   <div class="cart-item"><img src="${p.image}" alt="${p.name}"><div><h4>${p.name}</h4><small>${money(p.price)}</small><div class="quantity"><button data-qty="${p.id}" data-change="-1">−</button><b>${p.qty}</b><button data-qty="${p.id}" data-change="1">+</button></div></div><button class="remove-item" data-remove="${p.id}" aria-label="حذف">×</button></div>`).join(""):'<p class="cart-empty">سلتك فارغة حالياً 🛒</p>';
  $("cartTotal").textContent=money(items.reduce((s,p)=>s+p.price*p.qty,0));
}
function showToast(msg){const t=$("toast");t.textContent=msg;t.classList.add("show");clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>t.classList.remove("show"),2400);}
function openCart(){ $("cartDrawer").classList.add("open");$("overlay").classList.add("show");}
function closeCart(){ $("cartDrawer").classList.remove("open");$("overlay").classList.remove("show");}
$("productGrid").addEventListener("click",e=>{const b=e.target.closest("[data-add]");if(b)addToCart(Number(b.dataset.add));});
$("cartItems").addEventListener("click",e=>{
 const q=e.target.closest("[data-qty]"),r=e.target.closest("[data-remove]");
 if(q){const item=cart.find(x=>x.id===Number(q.dataset.qty));item.qty+=Number(q.dataset.change);if(item.qty<=0)cart=cart.filter(x=>x.id!==item.id);saveCart();}
 if(r){cart=cart.filter(x=>x.id!==Number(r.dataset.remove));saveCart();}
});
$("cartOpen").addEventListener("click",openCart);$("cartClose").addEventListener("click",closeCart);$("overlay").addEventListener("click",closeCart);
$("searchForm").addEventListener("submit",e=>{e.preventDefault();searchTerm=$("searchInput").value.trim();activeCategory="الكل";document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x.dataset.filter==="الكل"));renderProducts();$("products").scrollIntoView({behavior:"smooth"});});
$("searchInput").addEventListener("input",e=>{searchTerm=e.target.value.trim();renderProducts();});
document.querySelectorAll(".filter").forEach(b=>b.addEventListener("click",()=>{activeCategory=b.dataset.filter;document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x===b));renderProducts();}));
$("categoryGrid").addEventListener("click",e=>{const b=e.target.closest("[data-category]");if(!b)return;activeCategory=b.dataset.category;document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x.dataset.filter===activeCategory));renderProducts();$("products").scrollIntoView({behavior:"smooth"});});
$("sortSelect").addEventListener("change",renderProducts);
$("checkoutBtn").addEventListener("click",()=>{if(!cart.length){showToast("أضف منتجات إلى السلة أولاً");return;}closeCart();$("checkoutDialog").showModal();});
$("checkoutClose").addEventListener("click",()=>$("checkoutDialog").close());
$("checkoutForm").addEventListener("submit",e=>{
 e.preventDefault();const data=Object.fromEntries(new FormData(e.target).entries());
 const order={number:"TZ-"+Date.now().toString().slice(-7),customer:data,items:cart.map(x=>({...products.find(p=>p.id===x.id),qty:x.qty})),total:cart.reduce((s,x)=>s+products.find(p=>p.id===x.id).price*x.qty,0),date:new Date().toISOString()};
 const orders=JSON.parse(localStorage.getItem("techZoneOrders")||"[]");orders.push(order);localStorage.setItem("techZoneOrders",JSON.stringify(orders));
 $("checkoutDialog").close();e.target.reset();cart=[];saveCart();showToast("تم تسجيل الطلب التجريبي على هذا الجهاز");alert(`شكراً ${data.name}\\nرقم الطلب: ${order.number}\\nملاحظة: هذا طلب تجريبي محفوظ محلياً فقط.`);
});
$("newsletterForm").addEventListener("submit",e=>{e.preventDefault();showToast("شكراً لاشتراكك! (نموذج تجريبي)");e.target.reset();});
$("accountBtn").addEventListener("click",()=>showToast("يمكن إضافة تسجيل حساب عند ربط المتجر بخادم"));
$("year").textContent=new Date().getFullYear();
renderProducts();renderCart();
