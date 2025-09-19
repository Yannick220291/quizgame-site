"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Facebook, Mail, Phone, Star, Download, Menu, X } from "lucide-react";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [notification, setNotification] = useState(null);
  const [showStarReminder, setShowStarReminder] = useState(true);
  const [selectedStar, setSelectedStar] = useState(0);
  const [visits, setVisits] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [deviceMessage, setDeviceMessage] = useState("");

  // Compteur visites
  useEffect(() => {
    let count = parseInt(localStorage.getItem("visits") || "0") + 1;
    localStorage.setItem("visits", count);
    setVisits(count);
  }, []);

  // Masquer rappel étoiles après 50s
  useEffect(() => {
    if (showStarReminder) {
      const timer = setTimeout(() => setShowStarReminder(false), 50000);
      return () => clearTimeout(timer);
    }
  }, [showStarReminder]);

  // Détection appareil (PC vs mobile/tablette)
  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (/android|iphone|ipad|tablet/i.test(userAgent)) {
      setDeviceMessage(
        "📌 Pour télécharger l’application, cliquez sur l’icône 📥 ou le texte « Télécharger » dans le menu en haut ☰"
      );
    } else {
      setDeviceMessage(
        "📌 Pour télécharger l’application, cliquez sur le bouton « Télécharger » en haut ⬆️"
      );
    }
  }, []);

  // Détection contenu offensant simple
  const containsOffensiveContent = (text) => {
    const forbiddenWords = ["fuck", "sex", "porno", "xxx"];
    return forbiddenWords.some((word) =>
      text.toLowerCase().includes(word.toLowerCase())
    );
  };

  return (
    <main className="flex flex-col min-h-screen to-blue-200 relative">
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full bg-black/70 backdrop-blur-sm text-white py-4 px-6 z-50 shadow-lg">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <h1 className="font-bold text-lg">🎮 Quiz Game Battle</h1>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-6 items-center">
            <a href="#features" className="hover:text-blue-400 transition">
              Fonctionnalités
            </a>
            <a
              href="/quiz.apk"
              download
              className="flex items-center gap-2 hover:text-blue-400 transition font-semibold"
            >
              <Download size={18} /> Télécharger
            </a>
            <a href="#contact" className="hover:text-blue-400 transition">
              Contact
            </a>
          </nav>

          {/* Burger Menu (mobile) */}
          <button
            className="md:hidden text-white hover:text-blue-400 transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-black/90 text-white rounded-lg shadow-lg flex flex-col gap-4 p-4">
            <a
              href="#features"
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-blue-400 transition"
            >
              Fonctionnalités
            </a>
            <a
              href="/quiz.apk"
              download
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2 hover:text-blue-400 transition font-semibold"
            >
              <Download size={18} /> Télécharger
            </a>
            <a
              href="#contact"
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-blue-400 transition"
            >
              Contact
            </a>
          </div>
        )}
      </header>

      {/* HERO */}
      <section
        id="features"
        className="flex-1 flex flex-col items-center justify-center text-center p-6 relative"
      >
        <div className="absolute inset-0 bg-[url('/background.png')] bg-cover bg-center opacity-20"></div>

        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl sm:text-5xl font-extrabold mb-4 text-blue-700 drop-shadow-lg mt-20"
        >
          Quiz Game Battle 🎮
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-base sm:text-lg max-w-2xl mb-8 leading-relaxed text-white"
        >
          Bienvenue sur <b>Quiz Game Battle</b> 🚀 – un jeu unique qui te permet
          de défier tes amis dans un quiz épique !  
          📚 Améliore tes connaissances, 🎉 amuse-toi et 🏆 prouve que tu es le
          champion ultime.
          <br />
          <br />
          🔹 Des questions variées  
          🔹 Des défis en temps réel contre tes amis  
        </motion.p>

        {/* Message adaptatif */}
        <p className="mt-6 max-w-lg mx-auto text-sm sm:text-base font-medium text-gray-700 bg-blue-100 border border-yellow-300 px-4 py-3 rounded-xl shadow text-center leading-relaxed">
          {deviceMessage}
        </p>
      </section>

      {/* FOOTER */}
      <footer
        id="contact"
        className="bg-black text-gray-300 py-6 mt-10 relative z-20"
      >
        {/* Popup rappel étoiles */}
        {showStarReminder && (
          <div className="absolute -top-16 left-4 bg-yellow-400 text-black px-4 py-2 rounded-xl shadow-lg animate-bounce">
            ⭐ N’oublie pas d’envoyer une note en étoiles !
          </div>
        )}

        <div className="container mx-auto flex flex-col items-center gap-3 px-4">
          <p className="text-sm">© 2025 HASINIRINA Jean de Dieu</p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 hover:text-white"
            >
              <Mail size={18} /> Email
            </button>
            <div className="flex items-center gap-2 text-gray-300">
              <Facebook size={18} /> Nirina Hasina
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Phone size={18} /> 0381389332
            </div>
          </div>

          {/* Choix étoiles */}
          <div className="flex gap-2 mt-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={28}
                className={`cursor-pointer ${
                  selectedStar >= star ? "text-yellow-400" : "text-gray-500"
                }`}
                onClick={async () => {
                  setSelectedStar(star);
                  try {
                    await fetch("/api/sendEmail", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        name: "⭐ Évaluation utilisateur",
                        email: "system@quizgame.com",
                        message: `L’utilisateur a donné une note de ${star} étoile(s).`,
                      }),
                    });
                    setNotification({
                      type: "success",
                      text: "Merci pour votre note ⭐",
                      gif: "/success.gif",
                    });
                    setShowStarReminder(false);
                  } catch {
                    setNotification({
                      type: "error",
                      text: "Impossible d’envoyer la note.",
                      gif: "/error.gif",
                    });
                  }
                }}
              />
            ))}
          </div>

          {/* Compteur visites */}
          <p className="text-xs text-gray-400 mt-2">
            👀 {visits} utilisateurs ont visité ce site.
          </p>
        </div>
      </footer>

      {/* MODAL CONTACT */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-11/12 max-w-md relative text-black">
            <h2 className="text-xl font-bold mb-4 text-center">
              📩 Contactez-moi
            </h2>

            <form
              className="flex flex-col gap-3"
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.target;
                const name =
                  form[0].value.charAt(0).toUpperCase() + form[0].value.slice(1);
                const email = form[1].value.toLowerCase();
                const message = form[2].value;

                if (containsOffensiveContent(message)) {
                  setNotification({
                    type: "error",
                    text: "⚠️ Votre message contient des mots offensants.",
                    gif: "/error.gif",
                  });
                  return;
                }

                try {
                  const res = await fetch("/api/sendEmail", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email, message }),
                  });

                  if (res.ok) {
                    setNotification({
                      type: "success",
                      text: "✅ Message envoyé avec succès !",
                      gif: "/success.gif",
                    });
                    form.reset();
                  } else {
                    setNotification({
                      type: "error",
                      text: "❌ Erreur lors de l'envoi. Vérifie ton email ou ta connexion.",
                      gif: "/error.gif",
                    });
                  }
                } catch {
                  setNotification({
                    type: "error",
                    text: "⚠️ Problème de connexion. Réessaie plus tard.",
                    gif: "/error.gif",
                  });
                }
              }}
            >
              <input
                type="text"
                placeholder="Votre nom"
                className="border rounded-lg p-2 text-black capitalize"
                required
              />
              <input
                type="email"
                placeholder="Votre email"
                className="border rounded-lg p-2 text-black lowercase"
                required
              />
              <textarea
                placeholder="Votre message ✨"
                className="border rounded-lg p-2 h-24 text-black"
                required
              />

              <div className="flex gap-2">
                {["😀", "🎉", "🔥", "👍"].map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    onClick={() => {
                      const textarea = document.querySelector("textarea");
                      textarea.value += " " + emoji;
                    }}
                  >
                    {emoji}
                  </button>
                ))}
              </div>

              <button
                type="submit"
                className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Envoyer
              </button>

              {/* Notification */}
              {notification && (
                <div
                  className={`mt-3 p-2 rounded text-center ${
                    notification.type === "success"
                      ? "bg-green-500"
                      : "bg-red-500"
                  } text-white`}
                >
                  <p>{notification.text}</p>
                  <img
                    src={notification.gif}
                    alt="status gif"
                    className="mx-auto w-20 mt-2 rounded-lg"
                  />
                </div>
              )}
            </form>

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </main>
  );
}



