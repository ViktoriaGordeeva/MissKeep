import {EmailCompose} from '../cmps/Email-compose.jsx'

export function EmailOptions ({onMakeAnEmail}){

    return (
        <div className="email-options-container">
            <EmailCompose onMakeAnEmail={onMakeAnEmail}/>
            <div className="options-container">
                <button className="btn email-Inbox">Inbox</button>
            </div>
            <div className="options-container">
                <button className="btn email-Starred">Starred</button>
            </div>
            <div className="options-container">
                <button className="btn email-Trash">Trash</button>
            </div>
            <div className="options-container">
                <button className="btn email-Unread">Unread</button>
            </div>
        </div>

    )
}