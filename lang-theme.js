// ==========================================
// 1. ডার্ক ও লাইট মোডের সেটআপ
// ==========================================
const currentTheme = localStorage.getItem('appTheme') || 'dark';
document.documentElement.setAttribute('data-theme', currentTheme);

function toggleTheme() {
  const theme = document.documentElement.getAttribute('data-theme');
  const newTheme = theme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('appTheme', newTheme);
}

// ==========================================
// 2. ১০টি ভাষার ডিকশনারি (Translations)
// ==========================================
const translations = {
  en: {
    login: "Log In", signup: "Sign Up", market: "Market", trade: "Trade", 
    assets: "Assets", profile: "Profile", deposit: "Deposit", withdraw: "Withdraw",
    welcome: "Welcome", live_support: "Live Support", settings: "Settings",
    forgot_pass: "Forgot Password?", search: "Search...", balance: "Balance",
    history: "History", logout: "Log Out", name: "Full Name", email: "Email/Phone",
    password: "Password", submit: "Submit", cancel: "Cancel"
  },
  bn: { // বাংলা
    login: "লগ ইন", signup: "সাইন আপ", market: "মার্কেট", trade: "ট্রেড", 
    assets: "অ্যাসেটস", profile: "প্রোফাইল", deposit: "ডিপোজিট", withdraw: "উইথড্র",
    welcome: "স্বাগতম", live_support: "লাইভ সাপোর্ট", settings: "সেটিংস",
    forgot_pass: "পাসওয়ার্ড ভুলে গেছেন?", search: "খুঁজুন...", balance: "ব্যালেন্স",
    history: "ইতিহাস", logout: "লগ আউট", name: "পুরো নাম", email: "ইমেইল/ফোন",
    password: "পাসওয়ার্ড", submit: "জমা দিন", cancel: "বাতিল"
  },
  hi: { // হিন্দি
    login: "लॉग इन", signup: "साइन अप", market: "बाजार", trade: "व्यापार", 
    assets: "संपत्ति", profile: "प्रोफ़ाइल", deposit: "जमा", withdraw: "निकालना",
    welcome: "स्वागत है", live_support: "लाइव समर्थन", settings: "सेटिंग्स",
    forgot_pass: "पासवर्ड भूल गए?", search: "खोजें...", balance: "संतुलन",
    history: "इतिहास", logout: "लॉग आउट", name: "पूरा नाम", email: "ईमेल/फोन",
    password: "पासवर्ड", submit: "जमा करें", cancel: "रद्द करें"
  },
  zh: { // চাইনিজ
    login: "登录", signup: "注册", market: "市场", trade: "交易", 
    assets: "资产", profile: "个人资料", deposit: "存款", withdraw: "取款",
    welcome: "欢迎", live_support: "在线支持", settings: "设置",
    forgot_pass: "忘记密码？", search: "搜索...", balance: "余额",
    history: "历史", logout: "登出", name: "全名", email: "邮箱/电话",
    password: "密码", submit: "提交", cancel: "取消"
  },
  es: { // স্প্যানিশ
    login: "Iniciar sesión", signup: "Registrarse", market: "Mercado", trade: "Comercio", 
    assets: "Activos", profile: "Perfil", deposit: "Depositar", withdraw: "Retirar",
    welcome: "Bienvenido", live_support: "Soporte en vivo", settings: "Ajustes",
    forgot_pass: "¿Olvidaste tu contraseña?", search: "Buscar...", balance: "Saldo",
    history: "Historial", logout: "Cerrar sesión", name: "Nombre completo", email: "Correo/Teléfono",
    password: "Contraseña", submit: "Enviar", cancel: "Cancelar"
  },
  ar: { // আরবি
    login: "تسجيل الدخول", signup: "اشتراك", market: "سوق", trade: "تجارة", 
    assets: "أصول", profile: "حساب تعريفي", deposit: "إيداع", withdraw: "سحب",
    welcome: "مرحباً", live_support: "دعم مباشر", settings: "إعدادات",
    forgot_pass: "هل نسيت كلمة المرور؟", search: "بحث...", balance: "رصيد",
    history: "تاريخ", logout: "تسجيل خروج", name: "الاسم الكامل", email: "البريد/الهاتف",
    password: "كلمة المرور", submit: "إرسال", cancel: "إلغاء"
  },
  fr: { // ফ্রেঞ্চ
    login: "Connexion", signup: "S'inscrire", market: "Marché", trade: "Échange", 
    assets: "Actifs", profile: "Profil", deposit: "Dépôt", withdraw: "Retrait",
    welcome: "Bienvenue", live_support: "Support en direct", settings: "Paramètres",
    forgot_pass: "Mot de passe oublié?", search: "Rechercher...", balance: "Solde",
    history: "Historique", logout: "Déconnexion", name: "Nom complet", email: "Email/Téléphone",
    password: "Mot de passe", submit: "Soumettre", cancel: "Annuler"
  },
  pt: { // পর্তুগিজ
    login: "Entrar", signup: "Cadastrar", market: "Mercado", trade: "Negociar", 
    assets: "Ativos", profile: "Perfil", deposit: "Depositar", withdraw: "Sacar",
    welcome: "Bem-vindo", live_support: "Suporte ao vivo", settings: "Configurações",
    forgot_pass: "Esqueceu a senha?", search: "Pesquisar...", balance: "Saldo",
    history: "Histórico", logout: "Sair", name: "Nome completo", email: "Email/Telefone",
    password: "Senha", submit: "Enviar", cancel: "Cancelar"
  },
  ru: { // রাশিয়ান
    login: "Войти", signup: "Регистрация", market: "Рынок", trade: "Торговля", 
    assets: "Активы", profile: "Профиль", deposit: "Депозит", withdraw: "Вывод",
    welcome: "Добро пожаловать", live_support: "Живая поддержка", settings: "Настройки",
    forgot_pass: "Забыли пароль?", search: "Поиск...", balance: "Баланс",
    history: "История", logout: "Выйти", name: "Полное имя", email: "Эл. почта/Телефон",
    password: "Пароль", submit: "Отправить", cancel: "Отмена"
  },
  ja: { // জাপানিজ
    login: "ログイン", signup: "サインアップ", market: "マーケット", trade: "取引", 
    assets: "資産", profile: "プロフィール", deposit: "入金", withdraw: "出金",
    welcome: "ようこそ", live_support: "ライブサポート", settings: "設定",
    forgot_pass: "パスワードをお忘れですか？", search: "検索...", balance: "残高",
    history: "履歴", logout: "ログアウト", name: "氏名", email: "メール/電話",
    password: "パスワード", submit: "送信", cancel: "キャンセル"
  }
};

// ==========================================
// 3. ভাষা পরিবর্তনের ফাংশন
// ==========================================
function changeLanguage(lang) {
  if (!translations[lang]) return;
  
  localStorage.setItem('appLang', lang);
  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr'); // আরবি ভাষার জন্য ডান থেকে বাম

  // data-i18n অ্যাট্রিবিউট যুক্ত সব টেক্সট পরিবর্তন করা
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key]) {
      // ইনপুট ফিল্ড হলে প্লেসহোল্ডার পরিবর্তন হবে, অন্যথায় টেক্সট
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = translations[lang][key];
      } else {
        el.textContent = translations[lang][key];
      }
    }
  });
}

// পেজ লোড হওয়ার সময় আগের সেভ করা ভাষা লোড করা
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('appLang') || 'en';
  changeLanguage(savedLang);
});
