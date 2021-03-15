import React, { Component } from 'react';
import "./homePage.css";
import Modal from './Modal/Modal';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';
class homePage extends Component{
    
    checkValidity=()=>{
      let form={...this.props.form};
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      const phoneno = /^\d{10}$/;
      if(form.name.length<2)
      {
        alert("pl enter valid name");
        return false;
      }
      else if(form.address.length<5){
          alert("pl enter valid address");
          return false;
      }
      else if(!pattern.test(form.email)){
        alert("email is not valid");
        return false;
    }
      else if(!phoneno.test(form.mobileno)){
          alert("mobile no is not valid");
          return false;
      }
      else{
          return true;
      }
        
    }
    changed=(event)=>{
       // let check=this.checkValidity(event.target.value,event.target.id);
        if(true){
           
            let form ={...this.props.form};
            form[event.target.id]=event.target.value;
            //alert(event.target.id);
            this.props.onChanged(form);
        }
        
    }

    onClicked=()=>{
        let form={...this.props.form};
        if(this.props.edit)
        {
            let data=[...this.props.data];
            let index=data.findIndex(data=>data.id===this.props.editId);
            console.log(JSON.stringify(data[index]));
            data[index].name=form.name;
            data[index].email=form.email;
            data[index].address=form.address;
            data[index].mobileno=form.mobileno;
            let ans=this.checkValidity();
            if(ans){
                this.props.onClicked(data);
                this.props.onCancel();
                let id='';
                this.props.onEdit(this.props.edit,id);
            }
           
        }
        else
        {
          
            //alert('submit')
            let ans=this.checkValidity();
            if(ans){
                let id=Math.floor(Math.random()*1000);
                form.id=id;
                let data=[...this.props.data];
                data.push(form);
                this.props.onClicked(data);
                this.props.onCancel();
            }
           
           
            
            
        }
       
       
    }
    editHandler=(id)=>{
      //  alert("id"+id);
        this.props.onAddUser();
        let data=[...this.props.data];
        let index=data.findIndex(data=>data.id===id);
        let form={...this.props.form};
        form.name=data[index].name;
        form.email=data[index].email;
        form.address=data[index].address;
        form.mobileno=data[index].mobileno;
        this.props.onChanged(form);
        this.props.onEdit(this.props.edit,id);
    }
    deleteHandler=(id)=>{
        let data=[...this.props.data];
        let index=data.findIndex(data=>data.id===id);
        let ans=window.confirm('Are U sure want to Delete!!?');
        if(ans){
        data.splice(index,1);
        this.props.onClicked(data);
        }
    }
    addUser=()=>{
        let form={...this.props.form}
        form.email='';
        form.name='';
        form.address='';
        form.mobileno='';
        this.props.onChanged(form);
        this.props.onAddUser();
      
    }
    onCancel=()=>{
        this.props.onCancel();
    }

    render(){
        let table = this.props.data.map((person) => (
            <tr key={person.id} className="info">
                <td>{person.id}</td>
                <td>{person.name}</td>
                <td>{person.email}</td>
                <td>{person.address}</td>
                <td>{person.mobileno}</td>
                <td><button className="btn btn-success" onClick={() => this.editHandler(person.id)}><i class="fas fa-edit"></i></button></td>
                <td><button className="btn btn-danger" onClick={() => this.deleteHandler(person.id)}><i class="fas fa-trash-alt"></i></button></td>
            </tr>
        ));

        return(
            <div className="homepage">
               <div className="homepage_body">
                    
                    <nav>
                       <center> <button className="btn btn-danger" style={{height:'90%',width:'200px',borderRadius:'20px',marginTop:'2px',alignItems:'right'}} onClick={this.addUser}>Add User</button></center>
                    </nav>
                    <Modal show={this.props.modal}>
                        <input type="text" className="form-control" placeholder="enter your name" value={this.props.form.name} onChange={this.changed} id="name"/><br></br>
                        <input type="email" className="form-control"  placeholder="enter your email" value={this.props.form.email} onChange={this.changed} id="email"/><br/>
                        <input type="text" className="form-control"  placeholder="enter your address" value={this.props.form.address} onChange={this.changed} id="address"/><br/>
                        <input type="text" className="form-control"  placeholder="enter your phone No" value={this.props.form.mobileno} onChange={this.changed} id="mobileno"/><br/>
                        <center><button className="btn btn-success" onClick={this.onClicked}>Submit</button>
                        <button className="btn btn-danger" onClick={this.onCancel}>Cancel</button>
                        </center>
                    </Modal>
    
                    <div className="table">
                    <table className="table table-dark table-hover">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Contact Number</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {table}
                        </tbody>

                    </table>
                    </div>
               </div>
                
            </div>
        );
    }
}

const mapStateToProps=(State)=>{
    return{
        form:State.form,
        data:State.data,
        modal:State.modal,
        edit:State.edit,
        editId:State.editId
    };
}

const mapDispatchToProps=(dispatch)=>{
    return{
        onChanged:(form)=>dispatch(actions.onChanged(form)),
        onClicked:(data)=>dispatch(actions.onClicked(data)),
        onAddUser:()=>dispatch(actions.onAddUser()),
        onCancel:()=>dispatch(actions.onCancel()),
        onEdit:(value,id)=>dispatch(actions.onEdit(value,id))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(homePage);