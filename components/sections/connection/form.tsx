import { ProfileData } from '@/types/profile'
import React, { useRef, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import emailjs from "@emailjs/browser";
import { useToast } from '@/components/ui/toast-context'
import { useForm } from 'react-hook-form';

const ContactForm = ({profile}: {profile: ProfileData}) => {
  const {toast} = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      const { name, value } = e.target;
      setForm({ ...form, [name]: value });
    };
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      
      emailjs
        .send(
          "service_19d08rz",
          "template_dt4yh6p",
          {
            from_name: form.name,
            to_name: profile.name,
            from_email: form.email,
            to_email: profile.email,
            message: form.message,
          },
          "UIY0dV1BEuBgdOMKr",
        )
        .then(() => {
          setLoading(false);
          toast({
            title: "Message sent successfully!",
            description: "I will get back to you soon.",
            type: "success",
          })
          setForm({
            name: "",
            email: "",
            message: "",
          });
        })
        .catch((error: any) => {
          setLoading(false);
          alert("Sorry!! Something went wrong!!");
        });
    };
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-none shadow-xl p-8 artistic-frame">
        <div className="mb-8">
          <HandDrawnMessage />
          <h3 className="text-2xl font-serif text-red-900 dark:text-red-100 mt-4 mb-6 handwritten">
            Send a Message
          </h3>
        </div>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-red-700 dark:text-red-300 mb-2 handwritten">Your Name</label>
              <Input 
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="artistic-input border-2 border-red-200 dark:border-red-700 focus:border-red-500 dark:focus:border-red-400 rounded-lg bg-white/50 dark:bg-gray-700/50"
              />
            </div>
            <div>
              <label className="block text-red-700 dark:text-red-300 mb-2 handwritten">Your Email</label>
              <Input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="artistic-input border-2 border-red-200 dark:border-red-700 focus:border-red-500 dark:focus:border-red-400 rounded-lg bg-white/50 dark:bg-gray-700/50"
              />
            </div>
          </div>
          <div>
            <label className="block text-red-700 dark:text-red-300 mb-2 handwritten">Project Details</label>
            <Textarea
							rows={7}
							name="message"
							value={form.message}
							onChange={handleChange}
              required
              className="artistic-input border-2 border-red-200 dark:border-red-700 focus:border-red-500 dark:focus:border-red-400 rounded-lg min-h-32 bg-white/50 dark:bg-gray-700/50"
              placeholder="Tell me about your frontend project..."
            />
          </div>
          <Button className="w-full bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white py-4 rounded-full artistic-button">
            <span className="handwritten text-lg">{loading ? "Sending..." : "Start Our Journey"}</span>
          </Button>
        </form>
      </Card>
    </motion.div>
  )
}

const HandDrawnMessage = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="hand-drawn-icon">
    <path
      d="M8 12c0-2 2-4 4-4h24c2 0 4 2 4 4v16c0 2-2 4-4 4H16l-8 8V12z"
      stroke="currentColor"
      strokeWidth="2.5"
      fill="none"
      className="wobbly-line"
    />
    <path d="M16 20h16M16 26h12" stroke="currentColor" strokeWidth="2" className="wobbly-line" />
  </svg>
)

export default ContactForm