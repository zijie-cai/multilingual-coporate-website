import { motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { MapPin, Phone, Mail, Building2, Check, MessageSquare } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import LanguageSwitchBoundary from './LanguageSwitchBoundary';

interface ContactSectionProps {
  lang: 'en' | 'ja' | 'zh';
}

const content = {
  en: {
    title: "Contact Us",
    subtitle: "CONNECT WITH PRECISION",
    japan: "Japan Headquarters",
    companyName: "Ichiboku Co., Ltd.",
    addressLines: [
      "4-15-201 Yocho-cho, Shinjuku-ku, Tokyo 162-0055, Japan"
    ],
    mapTitle: "Headquarters Location",
    mapDescription: "Find our Tokyo headquarters on the map.",
    address: "Address",
    phone: "Phone",
    email: "Email",
    contact: "Contact Person",
    formTitle: "Send us a message",
    formSubtitle: "We’ll get back to you ASAP.",
    name: "Name / Company",
    emailField: "Email",
    phoneField: "Phone",
    message: "Message",
    submit: "Send Message",
    success: "Message sent successfully!",
    japanAddress: "4-15-201 Yocho-cho, Shinjuku-ku, Tokyo 162-0055",
    contactPerson: "Cai Lidong",
    phoneNumber: "080-7688-7280",
    emailPrimary: "ichiboku@gol.com",
  },
  ja: {
    title: "お問い合わせ",
    subtitle: "精密なコミュニケーション",
    japan: "日本本社",
    companyName: "株式会社 一木",
    addressLines: [
      "〒162-0055 東京都新宿区余丁町4-15-201"
    ],
    mapTitle: "本社所在地マップ",
    mapDescription: "東京本社所在地を地図でご確認ください。",
    address: "住所",
    phone: "電話",
    email: "E-mailアドレス",
    contact: "担当者",
    formTitle: "メッセージを送る",
    formSubtitle: "できるだけ早くご連絡いたします。",
    name: "お名前 / 会社名",
    emailField: "メールアドレス",
    phoneField: "電話番号",
    message: "メッセージ",
    submit: "送信する",
    success: "メッセージが送信されました！",
    japanAddress: "〒162-0055 東京都新宿区余丁町4-15-201",
    contactPerson: "蔡立東",
    phoneNumber: "080-7688-7280",
    emailPrimary: "ichiboku@gol.com",
  },
  zh: {
    title: "联系我们",
    subtitle: "精准沟通",
    japan: "日本总部",
    companyName: "一木株式会社",
    addressLines: [
      "日本东京都新宿区余丁町4-15-201，162-0055"
    ],
    mapTitle: "总部位置地图",
    mapDescription: "在地图上查看我们位于东京的总部位置。",
    address: "地址",
    phone: "电话",
    email: "邮箱",
    contact: "联系人",
    formTitle: "发送消息",
    formSubtitle: "我们会尽快回答您。",
    name: "姓名 / 公司",
    emailField: "邮箱",
    phoneField: "电话",
    message: "留言",
    submit: "发送消息",
    success: "消息发送成功！",
    japanAddress: "〒162-0055 東京都新宿区余丁町4-15-201",
    contactPerson: "蔡立东",
    phoneNumber: "080-7688-7280",
    emailPrimary: "ichiboku@gol.com",
  }
};

export default function ContactSection({ lang }: ContactSectionProps) {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const contactInfoRef = useRef(null);
  const formRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.6 });
  const contactInfoInView = useInView(contactInfoRef, { once: true, amount: 0.4 });
  const formInView = useInView(formRef, { once: true, amount: 0.4 });
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const contactDetails: Array<{
    icon: LucideIcon;
    label: string;
    lines: string[];
    footnoteLabel?: string;
    footnoteValue?: string;
  }> = [
    {
      icon: MapPin,
      label: content[lang].address,
      lines: content[lang].addressLines
    },
    {
      icon: Phone,
      label: content[lang].phone,
      lines: [content[lang].phoneNumber],
      footnoteLabel: content[lang].contact,
      footnoteValue: content[lang].contactPerson
    },
    {
      icon: Mail,
      label: content[lang].email,
      lines: [content[lang].emailPrimary]
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 3000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: '#F5EDE3' }}
      lang={lang}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <LanguageSwitchBoundary lang={lang}>
            <div className="font-['Roboto_Mono'] uppercase tracking-widest mb-4" style={{ fontSize: '0.875rem', color: '#5A1F1F' }}>
              {content[lang].subtitle}
            </div>
            <h2 className="font-['Playfair_Display']" style={{ fontSize: '2.5rem', fontWeight: 600, color: '#1E1E1E' }}>
              {content[lang].title}
            </h2>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={headerInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="h-[2px] bg-[#5A1F1F] mx-auto mt-6"
              style={{ width: '80px', transformOrigin: 'center' }}
            />
          </LanguageSwitchBoundary>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            ref={contactInfoRef}
            initial={{ opacity: 0, x: -30 }}
            animate={contactInfoInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="space-y-0"
          >
            {/* Japan Headquarters */}
            <div
              className="rounded-2xl border"
              style={{ backgroundColor: '#EFE9E1', borderColor: '#E0DAD2' }}
            >
              <div className="p-6 sm:p-8 space-y-8">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Building2 size={24} color="#5A1F1F" className="shrink-0" />
                    <div>
                      <h3
                        className="font-['Playfair_Display']"
                        style={{ fontSize: '1.35rem', fontWeight: 600, color: '#1E1E1E' }}
                      >
                        <LanguageSwitchBoundary as="span" lang={lang}>
                          {content[lang].japan}
                        </LanguageSwitchBoundary>
                      </h3>
                      <p style={{ color: '#5A1F1F', fontWeight: 500 }}>
                        <LanguageSwitchBoundary as="span" lang={lang}>
                          {content[lang].companyName}
                        </LanguageSwitchBoundary>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {contactDetails.map(({ icon: Icon, label, lines, footnoteLabel, footnoteValue }, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div
                        className="rounded-full p-2 flex items-center justify-center mt-1 shrink-0"
                        style={{
                          backgroundColor: '#EFE9E1',
                          lineHeight: 0
                        }}
                      >
                        <Icon size={18} color="#5A1F1F" />
                      </div>
                      <div style={{ color: '#4B433E', fontSize: '0.88rem', lineHeight: 1.5 }}>
                        <p
                          style={{
                            fontSize: '0.75rem',
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            color: '#7B2C2C',
                            fontWeight: 600
                          }}
                        >
                          <LanguageSwitchBoundary as="span" lang={lang}>
                            {label}
                          </LanguageSwitchBoundary>
                        </p>
                        <div style={{ marginTop: '0.25rem' }}>
                          {lines.map((line, li) => (
                            <p key={`${i}-${li}`} style={{ color: '#1E1E1E', fontWeight: 500 }}>
                              <LanguageSwitchBoundary as="span" lang={lang}>
                                {line}
                              </LanguageSwitchBoundary>
                            </p>
                          ))}
                          {footnoteLabel && footnoteValue && (
                            <p
                              style={{
                                color: '#5A1F1F',
                                marginTop: '0.45rem',
                                fontSize: '0.82rem',
                                fontWeight: 600
                              }}
                            >
                              <span style={{ letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                                <LanguageSwitchBoundary as="span" lang={lang}>
                                  {footnoteLabel}
                                </LanguageSwitchBoundary>
                              </span>
                              <span style={{ color: '#2C2620', marginLeft: '0.35rem', fontWeight: 700 }}>
                                <LanguageSwitchBoundary as="span" lang={lang}>
                                  {footnoteValue}
                                </LanguageSwitchBoundary>
                              </span>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ borderTop: '1px solid #E0DAD2' }} />

                <div className="pt-2">
                  <div className="rounded-2xl overflow-hidden shadow-sm">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d810.0615866991665!2d139.716146!3d35.695555!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188d700551501f%3A0x2b1d1092e72d6750!2z44Ko44K544Oa44Op44Oz44K15paw5a6_!5e0!3m2!1sen!2sus!4v1761058775802!5m2!1sen!2sus"
                      width="600"
                      height="215"
                      style={{ border: '0', minHeight: '200px' }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, x: 30 }}
            animate={formInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ delay: 0.25, duration: 0.8 }}
            className="rounded-2xl border"
            style={{ backgroundColor: '#EFE9E1', borderColor: '#E0DAD2' }}
          >
            <div className="p-6 sm:p-8 space-y-8">
              <div className="flex items-center gap-3">
                <MessageSquare size={24} color="#5A1F1F" className="shrink-0" />
                <div>
                  <h3
                    className="font-['Playfair_Display']"
                    style={{ fontSize: '1.45rem', fontWeight: 600, color: '#1E1E1E' }}
                  >
                    <LanguageSwitchBoundary as="span" lang={lang}>
                      {content[lang].formTitle}
                    </LanguageSwitchBoundary>
                  </h3>
                  <p
                    style={{ color: '#5A1F1F', fontWeight: 500 }}
                  >
                    <LanguageSwitchBoundary as="span" lang={lang}>
                      {content[lang].formSubtitle}
                    </LanguageSwitchBoundary>
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3">
                  <div>
                    <label
                      htmlFor="name"
                      style={{
                        fontSize: '0.75rem',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: '#7B2C2C',
                        fontWeight: 600,
                        display: 'block',
                        marginBottom: '0.25rem',
                      }}
                    >
                      <LanguageSwitchBoundary as="span" lang={lang}>
                        {content[lang].name}
                      </LanguageSwitchBoundary>
                    </label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full"
                      style={{ backgroundColor: '#F5EDE3', borderColor: '#E0DAD2' }}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      style={{
                        fontSize: '0.75rem',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: '#7B2C2C',
                        fontWeight: 600,
                        display: 'block',
                        marginBottom: '0.25rem',
                      }}
                    >
                      <LanguageSwitchBoundary as="span" lang={lang}>
                        {content[lang].emailField}
                      </LanguageSwitchBoundary>
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full"
                      style={{ backgroundColor: '#F5EDE3', borderColor: '#E0DAD2' }}
                    />
                  </div>
                </div>
                <div className="space-y-3 mt-3">
                  <div>
                    <label
                      htmlFor="phone"
                      style={{
                        fontSize: '0.75rem',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: '#7B2C2C',
                        fontWeight: 600,
                        display: 'block',
                        marginBottom: '0.25rem',
                      }}
                    >
                      <LanguageSwitchBoundary as="span" lang={lang}>
                        {content[lang].phoneField}
                      </LanguageSwitchBoundary>
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full"
                      style={{ backgroundColor: '#F5EDE3', borderColor: '#E0DAD2' }}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      style={{
                        fontSize: '0.75rem',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: '#7B2C2C',
                        fontWeight: 600,
                        display: 'block',
                        marginBottom: '0.25rem',
                      }}
                    >
                      <LanguageSwitchBoundary as="span" lang={lang}>
                        {content[lang].message}
                      </LanguageSwitchBoundary>
                    </label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={5}
                      className="w-full h-full"
                      style={{ backgroundColor: '#F5EDE3', borderColor: '#E0DAD2', minHeight: '140px' }}
                    />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-center"
                  style={{
                    marginTop: '2.5rem',
                    backgroundColor: submitted ? '#C4A474' : '#5A1F1F',
                    color: '#F6F4F2',
                    lineHeight: '1',
                  }}
                  onMouseEnter={(e) => {
                    if (!submitted) e.currentTarget.style.backgroundColor = '#7B2C2C';
                  }}
                  onMouseLeave={(e) => {
                    if (!submitted) e.currentTarget.style.backgroundColor = '#5A1F1F';
                  }}
                >
                  {submitted ? (
                    <>
                      <Check size={20} />
                      <LanguageSwitchBoundary as="span" lang={lang}>
                        {content[lang].success}
                      </LanguageSwitchBoundary>
                    </>
                  ) : (
                    <LanguageSwitchBoundary as="span" lang={lang}>
                      {content[lang].submit}
                    </LanguageSwitchBoundary>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
