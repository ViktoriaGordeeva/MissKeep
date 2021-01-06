
import { EmailPreview } from '../cmps/Email-preview.jsx'

export function EmailList({emails , onEmailPreview , onEmailDelete}){
    return (

        emails.map(email =>{
            return <EmailPreview email={email} key={email.id} onEmailPreview={onEmailPreview} onEmailDelete={onEmailDelete} />
        })

    )
}