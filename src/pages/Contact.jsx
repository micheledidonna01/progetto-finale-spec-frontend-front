import React from 'react';

export function Contact() {
    return (
        <div className='py-5'>
        <div className="container py-5 text-white">
            <h2 className="mb-4">Contattaci</h2>
            <p className="mb-4">Hai domande, richieste o hai bisogno di assistenza? Compila il modulo qui sotto o contattaci direttamente!</p>

            <div className="row">
                <div className="col-md-6">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Nome</label>
                            <input type="text" className="form-control" id="name" placeholder="Inserisci il tuo nome" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" placeholder="esempio@email.com" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="message" className="form-label">Messaggio</label>
                            <textarea className="form-control" id="message" rows="4" placeholder="Scrivi il tuo messaggio..."></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">Invia</button>
                    </form>
                </div>
                <div className="col-md-6">
                    <h5 className="mt-4 mt-md-0">Informazioni di contatto</h5>
                    <p><strong>Email:</strong> support@techshop.it</p>
                    <p><strong>Telefono:</strong> +39 0123 456789</p>
                    <p><strong>Indirizzo:</strong> Via Esempio 123, Milano, Italia</p>
                </div>
            </div>
        </div>
        </div>
    );
}