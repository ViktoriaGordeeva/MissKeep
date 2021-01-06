import { AppHeader } from '../../cmps/App-header.jsx'
import { MailService } from '../gmail/services/mail-service.js'
import { EmailList } from '../gmail/cmps/Email-list.jsx'
import { EmailOptions } from '../gmail/cmps/Email-options.jsx'
import { EmailFilter } from '../gmail/cmps/Email-filter.jsx'
import { eventBusService } from  '../../services/eventBusService.js'
import { UserMsg } from '../gmail/cmps/Email-UserMsg.jsx'


export class MailApp extends React.Component {

    state = {
        emails:[],
        filterBy:{
            subject:''
        },
        selectedEmail:null,
        comeposClicked:false,
        newEmail:{
            subject:'',
            body:''
        },

    }

    componentDidMount(){
        this.loadEmail()

    }

    loadEmail = () =>{
        const emails = MailService.query()
        this.setState({
            emails
        })
    }


    getEmailsForDisplay = () =>{
        const {filterBy} = this.state
        return this.state.emails.filter((email) =>{
            return email.subject.toLowerCase().includes(filterBy.subject.toLowerCase())
        })

    }
    onEmailPreview = (email) =>{
        this.setState({
            selectedEmail : email
        })

    }


    onEmailDelete = (email) =>{

            var copyEmail = MailService.deleteEmail(email.id)
            this.setState({
                emails : copyEmail
            })
 
    }



    




    onCloseModal = () =>{
        this.setState({
            selectedEmail :null,
            comeposClicked : false
          })
    }

      onMakeAnEmail = () =>{

        this.setState({
            comeposClicked: true
        })


    }


    onSetFilter = (filterBy) => {
        this.setState({ filterBy });
      };
    

    onSendEmail = (ev) =>{
        ev.preventDefault();
        eventBusService.emit('addemail' , {type: 'success' , txt: 'Your Email was successfully added!'})
        MailService.addEmail(this.state.newEmail).then(email =>{
            this.onAdd()


        })

        this.setState({
            comeposClicked : false
        })

    }


    onAdd = () =>{
        this.loadEmail()

    }

    onInputChange = (ev) =>{

        const email = {...this.state.newEmail}
        email[ev.target.name] = ev.target.value 

        this.setState({
            newEmail : email
        })
    }


    render() {
        return (
            <section className="mail-main">
                
                <UserMsg />
                <EmailFilter setFilter = {this.onSetFilter}/>
                <section className="email-container">
                    
                        <EmailOptions onMakeAnEmail={this.onMakeAnEmail}/>
                    <div className="email-list-container">
                        <EmailList emails={this.getEmailsForDisplay()} onEmailPreview={this.onEmailPreview} onEmailDelete={this.onEmailDelete}/>
                    </div>

                </section>

                {this.state.selectedEmail && <div className="modal">
                    <div className="modal-content">

                    <div className="modal-header">
                        <span className="close" onClick={()=>this.onCloseModal()}>&times;</span>
                        <h2>{this.state.selectedEmail.subject}</h2>
                    </div>


                    <div className="modal-body">
                        <p>{this.state.selectedEmail.body}</p>
                    </div>


                    </div>
                    </div>}


                {this.state.comeposClicked && <div className="modal">
                    <form className="modal-content" onSubmit={this.onSendEmail}>

                        <div className="modal-header-comepos">
                            <span className="close-compose" onClick={()=>this.onCloseModal()}>&times;</span>
                            <input name="subject" type="text" placeholder="Subject" className="modal-compose-subject" onChange={this.onInputChange}/>
                        </div>

                        <div className="modal-body-compose">
                            <textarea name="body" id="" className="modal-compose-body" placeholder="Text goes here" onChange={this.onInputChange}></textarea>


                        </div>
                    
                        <button type="submit" className="modal-compose-submit">Submit</button>



                    </form>
                    </div>}




            </section>
        )
    }
}

