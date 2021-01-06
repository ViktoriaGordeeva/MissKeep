export class BookFilter extends React.Component{

    state = {
        title:''
    }



    handleChange = (ev) =>{
        const callBack = () =>{
            this.props.setFilter(this.state)
        }
        this.setState({title:ev.target.value},callBack)
    }

    render(){
        return (
            <section>
                <input type="text" name="name" value={this.state.title} placeholder="Book name" onChange={this.handleChange}  className="book-search"/>
            </section>
        )
    }
}