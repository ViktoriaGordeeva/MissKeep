import { eventBusService } from '../../../services/eventBusService.js';


export class UserMsg extends React.Component {

    state = {
        msg:{
            type:'',
            txt:''
        },
        isMsgShown:false

    }

    componentDidMount() {
        this.unsubscribe = eventBusService.on('addemail' , (msg) =>{
            this.setState({
                msg,
                isMsgShown:true
            })
            setTimeout(this.onCloseMsg , 3000)
        })

    }

    componentWillUnmount(){
        this.unsubscribe()
    }

    onCloseMsg = () =>{
        this.setState({
            isMsgShown:false
        })
    }


    render(){
        const {msg,isMsgShown} = this.state
        if (!isMsgShown) return null;
        return(
            <section className="modal-user-msg">
                {msg.type === 'success' && <div className="modal-success">
                <button className="modal-close-msg" onClick={this.onCloseMsg}>X</button>
                    {msg.txt}

                    </div>}

            </section>
        )
    }

}