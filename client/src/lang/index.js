import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

const messages = {
  en: {
    notes: "Notes",
    mainCategory: "Main Categories",
    subCategory: "Sub Categories",
    users: "Users",
    departments: "Departments",

    all: "All",

    noData: "No Data",
    actions: "Actions",

    userName: "User Name",
    password: "Password",
    signIn: "Sign In",

    userNameNotNull: "Username not null!",
    passwordNotNull: "Password not null!",

    userNameOrPasswordWrong: "User Name and/or Password wrong!",
    allRequired: "All field required!",

    save: "Save",
    reset: "Reset",
    edit: "Edit",
    delete: "Delete",
    confirm: "Confirm",
    yes: "Yes",
    cancel: "Cancel",
    deleteQuestion: "Are you sure you want to delete it?",
    deleteOk: "The deletion is successful.",
    deleteCancel: "Deletion aborted!",

    departmentTitle: "Department Add/Edit",
    departmentName: "Department Name",
    departmentNamePlaceholder: "Department Name",

    mainCategoryTitle: "Main Category Add/Edit",
    mainCategoryName: "Main Category Name",
    mainCategoryNamePlaceholder: "Main Category Name",

    subCategoryTitle: "Sub Category Add/Edit",
    subCategoryName: "Sub Category Name",
    subCategoryNamePlaceholder: "Sub Category Name",

    userTitle: "User Add/Edit",
    userNamePlaceholder: "User Name",
    passwordPlaceholder: "Password",
    userAdmin: "Is Admin?",
    showPrivateNote: "It can see the private notes.",
    showDepartmentPrivateNote:
      "It can only see special notes in the department.",

    noteTitle: "Note Add/Edit",
    noteTitleField: "Title",
    noteTitleFieldPlaceholder: "Title",
    noteField: "Note",
    privateNote: "Private note.",
    departmentPrivateNote: "Private note on a departmental basis.",
    noteEditOnlyCreator: "The note only editable from creator.",
    creator: "Creator",
    createat: "Create At Date"
  },
  tr: {
    notes: "Notlar",
    mainCategory: "Ana Kategori",
    subCategory: "Alt Kategori",
    users: "Kullanıcılar",
    departments: "Departmanlar",

    all: "Tümü",

    noData: "Veri Yok",
    actions: "İşlemler",

    userName: "Kullanıcı Adı",
    password: "Parola",
    signIn: "Giriş Yap",

    userNameNotNull: "Kullanıcı Adı Boş Olamaz!",
    passwordNotNull: "Parola Boş Olamaz!",

    userNameOrPasswordWrong: "Kullanıcı adı ve/veya parola yanlış!",
    allRequired: "Tüm alanlar zorunludur!",

    save: "Kaydet",
    reset: "Temizle",
    edit: "Düzenle",
    delete: "Sil",
    confirm: "Onay",
    yes: "Evet",
    cancel: "Vazgeç",
    deleteQuestion: "Silmek istediğinize emin misiniz?",
    deleteOk: "Başarıyla silindi.",
    deleteCancel: "Silme işleminden vazgeçildi!",

    departmentTitle: "Departman Ekle/Düzenle",
    departmentName: "Departman Adı",
    departmentNamePlaceholder: "Departman Adı",

    mainCategoryTitle: "Ana Katageri Ekle/Düzenle",
    mainCategoryName: "Ana Kategori Adı",
    mainCategoryNamePlaceholder: "Ana Kategori Adı",

    subCategoryTitle: "Alt Kategori Ekle/Düzenle",
    subCategoryName: "Alt Kategori Adı",
    subCategoryNamePlaceholder: "Alt Kategori Ad",

    userTitle: "Kullanıcı Ekle/Düzenle",
    userNamePlaceholder: "Kullanıcı Adı",
    passwordPlaceholder: "Parola",
    userAdmin: "Admin mi?",
    showPrivateNote: "Gizli notları görebilir.",
    showDepartmentPrivateNote: "Departman bazında gizli notları görebilir.",

    noteTitle: "Not Ekle/Düzenle",
    noteTitleField: "Not Başlığı",
    noteTitleFieldPlaceholder: "Not Başlığı",
    noteField: "Not",
    privateNote: "Gizli not.",
    departmentPrivateNote: "Departman bazında gizli not.",
    noteEditOnlyCreator: "Sadece notun oluşturucusu düzenleyebilir.",
    creator: "Kaydeden",
    createat: "Kayıt Tarihi"
  }
};

let defLang = "en";
if (localStorage) {
  defLang = localStorage.getItem("defLang") || defLang;
}

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: defLang, // set locale
  messages // set locale messages
});

export default i18n;
