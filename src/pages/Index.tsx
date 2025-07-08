import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Calendar, MessageSquare, FileText, Bot, Users, Clock, Bell, UserCheck, Phone, Mail,Calculator, Building2, User, Home, CheckCircle, ArrowDown, Sparkles, ShoppingCart, Laptop, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    business: ''
  });
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [showScenario, setShowScenario] = useState(false);
  const { toast } = useToast();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);

    try {
      // Send to Make.com webhook
      const response = await fetch('https://hook.eu2.make.com/qnuqkq2qdfcb5xwju9ei9gd9uepd948s', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          business: formData.business,
          timestamp: new Date().toISOString()
        }),
      });

      toast({
        title: "תודה על פנייתך!",
        description: "נחזור אליך בהקדם האפשרי.",
      });

      // Reset form
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        business: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "שגיאה בשליחת הטופס",
        description: "אנא נסה שוב או צור קשר בטלפון.",
        variant: "destructive"
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCardClick = (index: number) => {
    setSelectedCard(index);
    setShowScenario(false);
  };

  const handleCloseCard = () => {
    setSelectedCard(null);
    setShowScenario(false);
  };

  const handleShowScenario = () => {
    setShowScenario(true);
  };

  const handleBackToServices = () => {
    setShowScenario(false);
  };

  const automationExamples = [
    {
      title: "פסיכולוגים",
      icon: Users,
      color: "from-cyan-400 to-blue-500",
      services: [
        "קביעת פגישות דרך WhatsApp",
        "סנכרון עם יומן אישי",
        "תזכורות אוטומטיות ללקוחות",
        "טיפול בביטולים ושינויים",
        "ניהול רשימות המתנה",
        "מעקב אחרי אי הגעות"
      ],
      scenario: `דמיינו את היום שלכם: השעה 7:00 בבוקר, אתם עדיין שותים קפה, ולקוח שלכם כבר שולח הודעת WhatsApp: "היי, אני צריך לקבוע פגישה לשבוע הבא."

במקום לקפוץ בין היומן הפיזי, האפליקציה בטלפון והודעות WhatsApp - המערכת שלנו עושה הכל בשבילכם. הלקוח פשוט כותב מתי הוא זמין, והמערכת מציגה לו את השעות הפנויות שלכם ונותנת לו לבחור. ברגע שהוא מאשר - הפגישה נכנסת לכם ליומן, הוא מקבל אישור, ויום לפני הפגישה שניכם מקבלים תזכורת אוטומטית.

אבל מה קורה אם הוא צריך לבטל? הוא פשוט עונה להודעה, המערכת מזהה שזה ביטול, משחררת את הזמן ושולחת לכם עדכון מיידי. אפילו יש לכם רשימת המתנה של לקוחות שרוצים לקדם פגישה - המערכת שולחת להם הודעה אוטומטית שנפנה מקום.

וכל זה קורה בזמן שאתם מתרכזים במה שחשוב באמת - לטפל בלקוחות שלכם.`
    },
    {
      title: "סוכני ביטוח",
      icon: FileText,
      color: "from-purple-400 to-pink-500",
      services: [
        "ניהול מסמכים דיגיטלי",
        "מעקב אחרי תוקף פוליסות",
        "תזכורות לחידוש ביטוח",
        "ניהול לידים ופניות חדשות",
        "אוטומציה לעדכון לקוחות",
        "דוחות ביצועים אוטומטיים"
      ],
      scenario: `תארו לעצמכם: לקוח מתקשר בפאניקה - "הביטוח שלי עומד לפוג בעוד שבוע!"

במקום לחפש בין ערימות מסמכים או לנסות לזכור מתי כל לקוח צריך לחדש, המערכת שלנו כבר שלחה לו תזכורת לפני 3 חודשים, לפני חודש, ולפני שבועיים. כל המידע על הפוליסה שלו מאוחסן בענן, נגיש לכם בכל רגע מכל מקום.

וזה לא נגמר שם - כשמגיע לקוח חדש, המערכת מזהה אותו, יוצרת לו תיק דיגיטלי, שולחת לו את כל המסמכים הרלוונטיים, ומעדכנת אתכם בזמן אמת על כל שינוי. בסוף החודש אתם מקבלים דוח מפורט על כל הלקוחות, החידושים, והמכירות - ללא שאתם צריכים להכין אפילו גליון אקסל אחד.

התוצאה? פחות עבודה אדמיניסטרטיבית, יותר זמן למכירות, ולקוחות מרוצים שמקבלים שירות מקצועי ומדויק.`
    },
    {
      title: "עורכי דין",
      icon: Building2,
      color: "from-emerald-400 to-teal-500",
      services: [
        "ניהול תיקים דיגיטלי",
        "מעקב אחרי מועדי דיון",
        "אוטומציה לחיובים",
        "תזכורות למועדים חשובים",
        "ניהול מסמכים משפטיים",
        "דוחות זמן עבודה"
      ],
      scenario: `דמיינו שאתם עובדים על 15 תיקים במקביל, וכל תיק עם מועדים קריטיים שלא ניתן לפספס.

במקום לחיות בלחץ מתמיד שאולי שכחתם מועד חשוב, המערכת שלנו עוקבת אחרי כל תיק בזמן אמת. היא שולחת לכם תזכורות אישיות שבוע לפני כל דיון, יום לפני, ובבוקר של הדיון עצמו. כל המסמכים של התיק מאורגנים בענן, נגישים לכם גם מבית המשפט.

והחיובים? שכחו מטבלאות אקסל מסובכות. כל שעת עבודה נרשמת אוטומטית לתיק הרלוונטי, ובסוף החודש אתם מקבלים חשבונית מפורטת לכל לקוח, עם פירוט מדויק של כל פעילות. אפילו לקוחות מקבלים עדכונים אוטומטיים על התקדמות התיק שלהם.

התוצאה? תיקים מאורגנים, מועדים מפוקחים, חיובים מדויקים, ואתם יכולים להתמקד במה שאתם הכי טובים בו - להיות עורכי דין מצוינים.`
    },
    {
      title: "מרפאות",
      icon: Calendar,
      color: "from-rose-400 to-pink-500",
      services: [
        "מערכת תורים מתקדמת",
        "תזכורות SMS ו-WhatsApp",
        "ניהול כרטיס רפואי דיגיטלי",
        "אוטומציה לתשלומים",
        "מעקב טיפולים",
        "סטטיסטיקות מטופלים"
      ],
      scenario: `שעה 8:00 בבוקר, המרפאה עוד לא פתוחה, ואתם כבר מקבלים הודעה: "היי, אני רוצה לקבוע תור לשבוע הבא."

במקום שהמטופל יחכה עד שהמרפאה תפתח, יתקשר, ויבלה 10 דקות בהמתנה, הוא פשוט כותב בWhatsApp מתי הוא זמין, והמערכת מציגה לו את התורים הפנויים. הוא בוחר, מאשר, ויום לפני התור הוא מקבל תזכורת אוטומטית.

ביום הטיפול: כל ההסטוריה הרפואית שלו מוכנה על המסך, כולל התרופות שהוא לוקח, אלרגיות, וכל הטיפולים הקודמים. אחרי הביקור המערכת מזכירה לו אוטומטית מתי לקבוע את התור הבא, ושולחת לו סיכום של הביקור.

וכל זה בזמן שאתם מתמקדים במה שחשוב באמת - לרפא ולטפל במטופלים שלכם, בלי עומס אדמיניסטרטיבי מיותר.`
    },
    {
      title: "מאמני כושר",
      icon: UserCheck,
      color: "from-orange-400 to-red-500",
      services: [
        "תיאום אימונים אישיים",
        "מעקב התקדמות לקוחות",
        "תוכניות אימון אוטומטיות",
        "תזכורות לאימונים",
        "ניהול תשלומים",
        "אפליקציית מעקב כושר"
      ],
      scenario: `רועי שולח הודעה ב־10 בערב: "היי, אני צריך לדחות את האימון של מחר ב־5 אחרי הצהריים למקום אחר."

במקום לבדוק מה יש לכם ב־5 ואז לכתוב הכל ביומן המערכת עושה את כל העבודה. היא בודקת מתי אתם פנויים, מעדכנת את היומן, ושולחת לרועי אישור על השינוי.

בבוקר של האימון, רועי מקבל תזכורת עם הזמן והמיקום המעודכנים. המערכת גם שולחת לו את פרטי האימון האחרון  איזה שרירים התקדמתם בו, כמה משקל הרים, ומה היעדים לאימון הבא.

ומה אם רועי רוצה לבטל?
המערכת מזכירה לו את מדיניות הביטולים מראש למשל: "אי אפשר לבטל יום לפני." במקום פשוט לעצור היא מציעה לו לדחות. אם הוא מתעקש לבטל, אתם מקבלים עדכון מסודר, כולל טיפול בחיוב לפי המדיניות שלכם.

התוצאה?
יומן מסודר, אוטומציה מלאה, בלי לרדוף אחרי מתאמנים ובלי להתעסק עם בירוקרטיה.
אתם מתמקדים באימונים – והמערכת דואגת לכל השאר.`
    },
    {
      title: "סוכני נדלן",
      icon: Home,
      color: "from-indigo-400 to-purple-500",
      services: [
        "ניהול נכסים דיגיטלי",
        "תיאום צפיות בנכסים",
        "מעקב אחרי לקוחות פוטנציאליים",
        "אוטומציה לעדכוני שוק",
        "ניהול מסמכי מכירה",
        "דוחות ביצועים ומכירות"
      ],
      scenario: `לקוח פוטנציאלי שולח לכם הודעה ב-10 בערב: "היי, ראיתי דירה ברחוב התמר 5, אני רוצה לקבוע צפייה למחר."

במקום לחכות לבוקר כדי לבדוק את היומן ולהתקשר, המערכת מזהה אוטומטית על איזה נכס הוא מדבר, מציגה לו את הזמנים הפנויים למחר, ומאפשרת לו לבחור. ברגע שהוא מאשר - הצפייה נכנסת לכם ליומן, הוא מקבל אישור עם כתובת מדויקת ופרטי קשר, ואתם מקבלים עדכון.

אחרי הצפייה המערכת שולחת לו אוטומטית חומר נוסף על הנכס, נכסים דומים באזור, ומידע על השכונה. כל האינטראקציה נשמרת בפרופיל שלו, כך שאתם יודעים בדיוק מה הוא חיפש, מה ראה, ומה העניין אותו.

התוצאה? יותר צפיות, לקוחות מרוצים שמקבלים שירות זמין 24/7, ואתם יכולים להתמקד במה שאתם הטובים בו ביותר - למכור נכסים.`
    },
    {
      title: "מכוני יופי",
      icon: Sparkles,
      color: "from-pink-400 to-rose-500",
      services: [
        "קביעת תורים אוטומטית",
        "תזכורות לטיפולים",
        "ניהול כרטיסי לקוח",
        "מעקב היסטוריית טיפולים",
        "ניהול מלאי מוצרים",
        "מערכת נקודות נאמנות"
      ],
      scenario: `לקוחה שולחת הודעה ב-11 בלילה: "היי, אני רוצה לקבוע תור לפדיקור לשישי הקרוב."

במקום שתצטרכו לחכות לבוקר כדי לבדוק את היומן ולהתקשר, המערכת מציגה לה אוטומטית את כל התורים הפנויים לשישי, כולל סוגי הטיפולים הזמינים ומשך הזמן הנדרש. היא בוחרת, מאשרת, ומקבלת הודעת אישור עם כל הפרטים.

יום לפני הטיפול היא מקבלת תזכורת עם המלצות להכנה, ואתם מקבלים תזכיר עם ההיסטוריה הקודמת שלה - איזה צבע לק היא אהבה, איזה טיפולים עשתה, ואם יש לה אלרגיות או העדפות מיוחדות.

אחרי הטיפול המערכת שולחת לה הודעת תודה עם טיפים לטיפוח בבית, מזכירה לה על המוצרים שהמליצה עליהם, ומציעה לה לקבוע את הטיפול הבא. וכל זה בזמן שאתם מתמקדים במה שאתם הכי טובים בו - להפוך אותה ליפה יותר.`
    },
    {
      title: "רואי חשבון",
      icon: Calculator,
      color: "from-green-400 to-emerald-500",
      services: [
        "ניהול לקוחות אוטומטי",
        "מעקב אחרי מועדי דוח",
        "התראות על תשלומים",
        "ניהול מסמכים דיגיטלי",
        "אוטומציה לחשבוניות",
        "דוחות ביצועים פיננסיים"
      ],
      scenario: `לקוח שולח לכם הודעה ב-11 בערב: "היי, אני צריך עזרה עם הדוח החודשי, מתי אפשר להיפגש?"

במקום לחכות לבוקר כדי לבדוק את היומן ולהתקשר, המערכת מזהה אוטומטית על איזה דוח הוא מדבר (לפי מועד ההגשה שלו), מציגה לו את הזמנים הפנויים שלכם השבוע, ומאפשרת לו לבחור. ברגע שהוא מאשר - הפגישה נכנסת לכם ליומן והוא מקבל אישור.

יומיים לפני הפגישה המערכת שולחת לו רשימה של כל המסמכים שהוא צריך להביא, ואתם מקבלים תזכיר עם כל הפרטים הרלוונטיים שלו - איזה דוחות הוא מגיש, מתי המועד האחרון, ומה הסטטוס הנוכחי.

אחרי הפגישה המערכת מעדכנת אוטומטית את סטטוס הדוח, שולחת לו אישור על מה שדיברתם, ומזכירה לו על מועדים קרובים. בסוף החודש אתם מקבלים דוח מפורט על כל הלקוחות, הדוחות שהוגשו, והכנסות - ללא שאתם צריכים לעשות אפילו חישוב אחד.

התוצאה? פחות פניות טלפון מיותרות, לקוחות מרוצים שמקבלים תזכורות בזמן, ואתם יכולים להתמקד במה שאתם הכי טובים בו - לנהל את הכספים של הלקוחות בצורה מקצועית.`
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900" dir="rtl">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-purple-900/20 to-slate-900/50"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,119,198,0.1),transparent_50%)]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              <span className="gradient-text">Optimo</span>
              <br />
              <span className="text-white">פתרונות אוטומציה לעסקים</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              שימוש בכלים דיגיטליים כדי לבצע פעולות חוזרות ומוכרות, בלי שתצטרך לעשות אותן ידנית.
מאחורי הקלעים, העסק שלך לא נח לרגע. לקוחות מקבלים מענה, פגישות נסגרות, משימות מתבצעות והכול קורה אוטומטית.
העוזרת האישית שתמיד כאן.
זמן זה כסף ואנחנו שומרים לך על שניהם.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                size="lg"
                className="btn-gradient text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border-0"
                onClick={() => scrollToSection('contact')}
              >
                <Phone className="ml-2 h-5 w-5" />
                יצירת קשר
              </Button>

              <Button
                size="lg"
                className="btn-gradient text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border-0"
                onClick={() => scrollToSection('examples')}
              >
                <MessageSquare className="ml-2 h-5 w-5" />
                צפה בדוגמאות
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section id="examples" className="py-20 bg-gradient-to-br from-purple-900/80 via-slate-800/70 to-purple-900/90 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.1),transparent_50%)]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 gradient-text">דוגמאות לאוטומציה</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              כאן תוכל לראות מגוון פתרונות אוטומציה שפיתחנו לעסקים שונים.
              כל פתרון מותאם במיוחד לצרכים של התחום.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 ">
            {automationExamples.map((example, index) => {
              const IconComponent = example.icon;
              return (
                <Dialog key={index}>
                  <DialogTrigger asChild>
                    <div
                      className="flex flex-col items-center justify-center cursor-pointer group transition-all duration-300 hover:scale-110 hover:-translate-y- "
                      onClick={() => handleCardClick(index)}
                    >
                      <div className={`w-20 h-20 mb-4 rounded-full bg-gradient-to-r ${example.color} flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110`}>
                        <IconComponent className="h-10 w-10 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white text-center group-hover:text-purple-300 transition-colors duration-300">{example.title}</h3>
                    </div>
                  </DialogTrigger>

                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto text-right " dir="rtl">
                    {!showScenario ? (
                      <>
                        <DialogHeader className="text-center relative">

                          <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${example.color} flex items-center justify-center shadow-lg`}>
                            <IconComponent className="h-8 w-8 text-white" />
                          </div>
                          <DialogTitle className="text-center text-2xl font-bold">{example.title}</DialogTitle>
                          <DialogDescription className="text-center text-lg text-gray-600">
                            השירותים שאנחנו מציעים
                          </DialogDescription>
                        </DialogHeader>

                        <div className="mt-6 mb-6 text-right" dir="rtl">
                          <div className="space-y-4 text-right">
                            {example.services.map((service, serviceIndex) => (
                              <div key={serviceIndex} className="flex items-start gap-3 text-right">
                                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${example.color} mt-2 flex-shrink-0`}></div>
                                <span className="text-gray-700 leading-relaxed">{service}</span>

                              </div>
                            ))}
                          </div>
                        </div>


                        <div className="flex gap-4 mt-8 justify-center">
                          <Button
                            onClick={() => setShowScenario(true)}
                            className="btn-gradient text-white px-6 py-3 rounded-full"
                          >
                            דוגמא מחיינו
                          </Button>
                          <DialogClose asChild>
                            <Button
                              className="btn-gradient text-white px-6 py-3 rounded-full"
                            >
                              סגור
                            </Button>
                          </DialogClose>
                        </div>
                      </>
                    ) : (
                      <>
                        <DialogHeader className="text-center relative">
                          <DialogClose asChild>
                            <Button
                              className="absolute left-0 top-0 h-8 w-8 rounded-full p-0 bg-gray-200 hover:bg-gray-300"
                              variant="ghost"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </DialogClose>
                          <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${example.color} flex items-center justify-center shadow-lg`}>
                            <IconComponent className="h-8 w-8 text-white" />
                          </div>
                          <DialogTitle className="text-center text-2xl font-bold">{example.title}</DialogTitle>
                          <DialogDescription className="text-center text-lg text-gray-600">
                            איך זה באמת עובד? הנה תרחיש אמיתי מהחיים
                          </DialogDescription>
                        </DialogHeader>

                        <div className="mt-6" dir="rtl">
                          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed text-right">
                            <p className="text-lg whitespace-pre-line text-right">{example.scenario}</p>
                          </div>
                          <div className="flex justify-center mt-8">
                            <ArrowDown className="h-8 w-8 text-purple-400 animate-bounce" />
                          </div>
                        </div>

                        <div className="flex gap-4 mt-8 justify-center">
                          <Button
                            onClick={() => setShowScenario(false)}
                            className="btn-gradient text-white px-6 py-3 rounded-full"
                          >
                            חזרה
                          </Button>
                          <DialogClose asChild>
                            <Button
                              className="btn-gradient text-white px-6 py-3 rounded-full"
                            >
                              סגור
                            </Button>
                          </DialogClose>
                        </div>
                      </>
                    )}
                  </DialogContent>
                </Dialog>
              );
            })}
          </div>
        </div>
      </section>

      {/* Free Consultation Section */}
      <section className="py-12 bg-gradient-to-br from-gray-900/90 via-slate-800/80 to-gray-900/95">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 gradient-text">יעוץ חינם</h2>
          </div>

          <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm shadow-2xl">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <p className="text-xl text-gray-300 mb-8">
                  אני מציע יעוץ חינמי בן 30 דקות בו נבחן יחד:
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                  <span className="text-lg text-gray-300">את התהליכים הקיימים בעסק שלכם</span>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                  <span className="text-lg text-gray-300">הזדמנויות לאוטומציה וחיסכון</span>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                  <span className="text-lg text-gray-300">פתרון מותאם ביחוד לצרכים שלכם</span>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                  <span className="text-lg text-gray-300">תוכנית יישום מפורטת</span>
                </div>
              </div>

              <div className="text-center mt-10">
                <div className="flex flex-col items-center gap-4">
                  <p className="text-lg text-gray-300">השאר פרטים למטה ונחזור אליך בהקדם</p>
                  <ArrowDown className="h-8 w-8 text-purple-400 animate-bounce" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="contact" className="py-20 bg-gradient-to-br from-slate-900/80 via-slate-800/90 to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 gradient-text">צור קשר</h2>
            <p className="text-xl text-gray-300">
              מוכן להתחיל? השאר פרטים ונחזור אליך בהקדם
            </p>
          </div>

          <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm shadow-2xl">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-lg font-medium flex items-center gap-2 text-white">
                      <User className="h-5 w-5" />
                      שם מלא
                    </Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="h-12 text-lg rounded-lg border-gray-600 bg-gray-700/50 text-white focus:border-purple-400"
                      placeholder="הכנס שם מלא"
                    />
                  </div>

                  <div className="space-y-2 ">
                    <Label htmlFor="phone" className="text-lg font-medium flex items-center gap-2 text-white">
                      <Phone className="h-5 w-5" />
                      טלפון
                    </Label>
                    <Input
                      dir="rtl"

                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="h-12 text-lg rounded-lg border-gray-600 bg-gray-700/50 text-white focus:border-purple-400"
                      placeholder="הכנס מספר טלפון"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-lg font-medium flex items-center gap-2 text-white">
                      <Mail className="h-5 w-5" />
                      מייל
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="h-12 text-lg rounded-lg border-gray-600 bg-gray-700/50 text-white focus:border-purple-400"
                      placeholder="הכנס כתובת מייל"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="business" className="text-lg font-medium flex items-center gap-2 text-white">
                      <Building2 className="h-5 w-5" />
                      שם העסק או התחום
                    </Label>
                    <Input
                      id="business"
                      name="business"
                      value={formData.business}
                      onChange={handleInputChange}
                      required
                      className="h-12 text-lg rounded-lg border-gray-600 bg-gray-700/50 text-white focus:border-purple-400"
                      placeholder="הכנס שם העסק או התחום"
                    />
                  </div>
                </div>

                <div className="text-center pt-6">
                  <Button
                    type="submit"
                    size="lg"
                    className="btn-gradient text-white px-12 py-4 text-xl font-semibold rounded-full shadow-lg border-0"
                  >
                    <MessageSquare className="ml-2 h-6 w-6" />
                    שלח הודעה
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="bg-gray-900/90 backdrop-blur-sm text-white py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold mb-4 gradient-text">Optimo</h3>
          <p className="text-gray-400 text-lg">
            פתרונות אוטומציה מתקדמים לעסקים מודרניים
          </p>
          <div className="mt-8 text-gray-500">
            © 2024 Optimo. כל הזכויות שמורות.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
