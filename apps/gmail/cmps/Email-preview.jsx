export function EmailPreview ({email , onEmailPreview , onEmailDelete}){

    return (
        <div className="email-preview">
            <h1 className="email-subject" >
               

                {email.subject}
                
                <div>
                    <button className="fas star"></button>
                    <button className="fas viewfull"  onClick={()=>onEmailPreview(email)}></button>
                    <button className="fas delete" onClick={()=>onEmailDelete(email)}></button>
                </div>

            </h1>

        </div>
    )

}