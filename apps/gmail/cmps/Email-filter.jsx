export class EmailFilter extends React.Component{

    state = {
        subject:''
    }



    handleChange = (ev) =>{
        const callBack = () =>{
            this.props.setFilter(this.state)
        }
        this.setState({subject:ev.target.value},callBack)
    }

    render(){
        return (
            <section className="email-search">
                <input type="text" name="name" value={this.state.title} placeholder="Search Email" onChange={this.handleChange} className="email-search-input" />
            </section>
        )
    }
}