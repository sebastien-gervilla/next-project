"use client";

import './page.scss';
import { ToastContainer, toast } from 'react-toastify';
import { ChangeEvent, useState } from "react";

interface ContactModel {
    name: string;
    email: string;
    message: string;
}

export default function ContactPage() {

    const [contactForm, setContactForm] = useState<ContactModel>(defaultContactForm);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const toastId = toast.loading('Loading...');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contactForm),
            });

            if (response.status === 200) {
                toast.dismiss(toastId);
                toast.success('Message envoyé avec succès !');
                return setContactForm(defaultContactForm);
            }

            if (response.status === 400) {
                const data = await response.json();
                toast.dismiss(toastId);
                for (const error of data.errors)
                    toast.error(`${error.field ? `${error.field}: ` : ''}${error.message}`);
            }

            toast.dismiss(toastId);
            toast.error('Une erreur est survenue...');

        } catch (error) {
            toast.dismiss(toastId);
            toast.error('Une erreur est survenue...');
        }
    };

    const handleFormChanges = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;

        setContactForm(current => ({
            ...current,
            [name]: value,
        }));
    }

    return (
        <div id='contact-page' className="page">
            <h2>Contactez-nous</h2>
            <form onSubmit={handleSubmit}>
                <div className='form-field'>
                    <label htmlFor='name'>Nom</label>
                    <input
                        id='name'
                        type="text"
                        name='name'
                        value={contactForm.name}
                        onChange={handleFormChanges}
                    />
                </div>

                <div className='form-field'>
                    <label htmlFor='email'>Email</label>
                    <input
                        id='email'
                        type="email"
                        name='email'
                        value={contactForm.email}
                        onChange={handleFormChanges}
                    />
                </div>

                <div className='form-field'>
                    <label htmlFor='message'>Message</label>
                    <textarea
                        id='message'
                        name='message'
                        rows={5}
                        value={contactForm.message}
                        onChange={handleFormChanges}
                    />
                </div>

                <button type="submit">Envoyer</button>
            </form>

            <ToastContainer />
        </div>
    );
}

const defaultContactForm: ContactModel = {
    name: '',
    email: '',
    message: ''
};