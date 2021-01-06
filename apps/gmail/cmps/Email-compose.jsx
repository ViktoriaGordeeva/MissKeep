export function EmailCompose ({onMakeAnEmail}){

    return(
        <button className="btn email-compose" onClick={()=>onMakeAnEmail()}>Compose</button>
    )
}
