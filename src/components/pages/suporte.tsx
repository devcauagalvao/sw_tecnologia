import React from 'react'
import { motion } from 'framer-motion'
import ParticleBackground from '../ui/ParticleBackground'

const Suporte: React.FC = () => {
    return (
        <div className="flex relative min-h-screen text-white overflow-hidden">
            <ParticleBackground />
            {/* Conteúdo principal */}
            <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12">
                {/* Hero */}
                <motion.div
                    className="text-center max-w-4xl"
                    initial={{ opacity: 0, y: -80 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Logo */}
                    <div className="flex justify-center mb-6">
                        <img
                            src="/src/assets/img/sw.png"
                            alt="SW Tecnologia"
                            className="h-20 w-auto drop-shadow-lg"
                        />
                    </div>

                    <p className="text-lg md:text-xl text-gray-300 mb-10">
                        Nossa equipe está pronta para levar sua empresa a outro nível com tecnologia de alto desempenho.
                        <span className="block font-semibold text-[#098fd2] mt-3 text-lg md:text-xl">
                            Fale com a gente agora mesmo!
                        </span>
                    </p>
                </motion.div>

                {/* Botões de contato */}
                <motion.div
                    className="flex flex-col md:flex-row gap-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                >
                    {/* WhatsApp */}
                    <a
                        href="https://wa.me/5511919167653"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-5 rounded-3xl shadow-2xl transition transform hover:scale-105 hover:shadow-3xl"
                    >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                        </svg>
                        WhatsApp
                    </a>

                    {/* Instagram */}
                    <a
                        href="https://www.instagram.com/glv_informatica"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:opacity-90 text-white font-bold px-8 py-5 rounded-3xl shadow-2xl transition transform hover:scale-105 hover:shadow-3xl"
                    >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12.017 0C8.396 0 8.013.016 6.801.092 5.598.17 4.785.34 4.115.613c-.706.278-1.305.65-1.901 1.244C1.62 2.451 1.248 3.05.97 3.756.697 4.426.527 5.239.449 6.442.373 7.654.357 8.037.357 11.658c0 3.621.016 4.004.092 5.216.078 1.203.248 2.016.521 2.686.278.706.65 1.305 1.244 1.901.596.596 1.195.968 1.901 1.246.67.273 1.483.443 2.686.521 1.212.076 1.595.092 5.216.092 3.621 0 4.004-.016 5.216-.092 1.203-.078 2.016-.248 2.686-.521.706-.278 1.305-.65 1.901-1.246.596-.596.968-1.195 1.246-1.901.273-.67.443-1.483.521-2.686.076-1.212.092-1.595.092-5.216 0-3.621-.016-4.004-.092-5.216-.078-1.203-.248-2.016-.521-2.686C22.251 4.395 21.879 3.796 21.285 3.2c-.596-.596-1.195-.968-1.901-1.246-.67-.273-1.483-.443-2.686-.521C16.486.016 16.103 0 12.482 0h-.465zm-.171 2.171c.447 0 .848.003 1.254.006 3.318 0 3.708.016 5.016.092 1.211.055 1.867.258 2.305.428.579.225.993.493 1.427.927.434.434.702.848.927 1.427.17.438.373 1.094.428 2.305.076 1.308.092 1.698.092 5.016 0 3.318-.016 3.708-.092 5.016-.055 1.211-.258 1.867-.428 2.305-.225.579-.493.993-.927 1.427-.434.434-.848.702-1.427.927-.438.17-1.094.373-2.305.428-1.308.076-1.698.092-5.016.092-3.318 0-3.708-.016-5.016-.092-1.211-.055-1.867-.258-2.305-.428-.579-.225-.993-.493-1.427-.927-.434-.434-.702-.848-.927-1.427-.17-.438-.373-1.094-.428-2.305-.076-1.308-.092-1.698-.092-5.016 0-3.318.016-3.708.092-5.016.055-1.211.258-1.867.428-2.305.225-.579.493-.993.927-1.427.434-.434.848-.702 1.427-.927.438-.17 1.094-.373 2.305-.428 1.146-.052 1.588-.064 4.171-.064zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                        </svg>
                        Instagram
                    </a>

                    {/* Facebook */}
                    <a
                        href="https://facebook.com/glvinformatica"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-5 rounded-3xl shadow-2xl transition transform hover:scale-105 hover:shadow-3xl"
                    >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                        Facebook
                    </a>
                </motion.div>

                {/* Rodapé */}
                <motion.div
                    className="mt-16 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                >
                    <p className="text-gray-400 mb-1">
                        🚀{' '}
                        <a
                            href="https://www.glvinformatica.com.br"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline underline-offset-4 hover:opacity-80 transition"
                        >
                            GLV Informática e Desenvolvimento
                        </a>
                    </p>
                    <p className="text-[#098fd2] font-semibold tracking-wide">
                        Performance • Escalabilidade • Inovação
                    </p>
                </motion.div>
            </main>
        </div>
    )
}
    
export default Suporte;