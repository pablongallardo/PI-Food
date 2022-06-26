import React, { useEffect } from "react"
import {connect} from "react-redux"
import { useDispatch, useSelector } from "react-redux"
import { getRecipeDetails } from "../actions"
import { Link } from "react-router-dom"
import './recipeDetail.css';


class RecipeDetails extends React.Component{

    componentDidMount() {
        const id = this.props.match.params.id
        // console.log(id)
        this.props.getRecipeDetails(id)
        
    }

    render() {
        return (
            <div className='details' key={this.props.id}>
            
                     <div className='divImg'>
                       <img className='detailImg' src={this.props.recipeDetails.image ?
                            this.props.recipeDetails.image : 
                            'C:\SoyHenry carrera\PI-Food-main (1)\PI-Food-main\client\src\store\imagenes\specias.png'} alt="Pic not found"/>
                      </div>
                    <h1 className='text'>{this.props.recipeDetails.name}</h1>
            
                    {this.props.recipeDetails.dishTypes ?
                    <div className='dish'>
                        <h2 className='text'> Dish Type: </h2>
                        {this.props.recipeDetails.dishTypes?.map(e => {
                            return (
                                <h2 className='dishesanddiets' key={e}>{e}</h2>
                            )
                        })}
                    </div>:
                    <br/>
                    }
            
                    <div className='dish'>
                        <h2 className='text'>Diet Types: </h2>
                        {this.props.recipeDetails.dietTypes ? this.props.recipeDetails.dietTypes.map(e => {
                            return (
                                <h2 className='dishesanddiets'key={e}>{e}</h2>
                             )
                        }) :
                        this.props.recipeDetails.diets?.map(e => {
                            <h2 className='dishesanddiets'key={e.name}>{e.name}</h2>
                        })
                    }
                    </div>
            
                    <div className='dish'>
                        <h3 className='text' >Summary: </h3>
                        <p className='summary'>{this.props.recipeDetails.summary?.replace(/<[^>]*>/g, '')}</p>
                    </div>
            
                    <div className='dish'>
                        <h3 className='score' >Score: {this.props.recipeDetails.score}</h3>
                        <h3 className='score' >Healtiness points: {this.props.recipeDetails.healtScore}</h3>
                    </div>
            
                    <div className='dish'>
                        <h3 className='text' >Steps: </h3>
                        <ul className='steps'>{Array.isArray(this.props.recipeDetails.steps) ? this.props.recipeDetails.steps.map(e => {
                            return (
                                <li key={e.number}>{e.step}</li>
                            )
                        }) :
                        <li>{this.props.recipeDetails.steps}</li> 
                    }
                    </ul>
                    </div>
            
                    <Link to='/home'><button className='backButton'> Go back to recipes</button></Link>
                    </div>
            )

    }

    
    

}

function mapStateToProps(state){
    return {
        recipeDetails: state.recipeDetails
    }
}


function mapDispatchToProps(dispatch) {
    return {
        getRecipeDetails: (id) =>dispatch(getRecipeDetails(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetails);
// export default function RecipeDetails(props) {
//     const dispatch = useDispatch();
//     const id = props.match.params.id;

//      useEffect(() =>{
//         dispatch(getRecipeDetails(id))
//     },[dispatch,id]);

//     const recipeDetails = useSelector (state => state.recipeDetails)

//     return (

//         <div className='details' key={id}>
            
//           <div className='divImg'>
//             <img className='detailImg' src={recipeDetails.image ?
//                 recipeDetails.image : 
//                 'https://images.unsplash.com/photo-1635321593217-40050ad13c74?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1748&q=80'} alt="Pic not found"/>
//           </div>
//         <h1 className='text'>{recipeDetails.name}</h1>

//         {recipeDetails.dishTypes ?
//         <div className='dish'>
//             <h2 className='text'> Dish Type: </h2>
//             {recipeDetails.dishTypes?.map(e => {
//                 return (
//                     <h2 className='dishesanddiets' key={e}>{e}</h2>
//                 )
//             })}
//         </div>:
//         <br/>
//         }

//         <div className='dish'>
//             <h2 className='text'>Diet Types: </h2>
//             {recipeDetails.dietTypes ? recipeDetails.dietTypes.map(e => {
//                 return (
//                     <h2 className='dishesanddiets'key={e}>{e}</h2>
//                  )
//             }) :
//             recipeDetails.diets?.map(e => {
//                 <h2 className='dishesanddiets'key={e.name}>{e.name}</h2>
//             })
//         }
//         </div>

//         <div className='dish'>
//             <h3 className='text' >Summary: </h3>
//             <p className='summary'>{recipeDetails.summary?.replace(/<[^>]*>/g, '')}</p>
//         </div>

//         <div className='dish'>
//             <h3 className='score' >Score: {recipeDetails.score}</h3>
//             <h3 className='score' >Healtiness points: {recipeDetails.healtScore}</h3>
//         </div>

//         <div className='dish'>
//             <h3 className='text' >Steps: </h3>
//             <ul className='steps'>{Array.isArray(recipeDetails.steps) ? recipeDetails.steps.map(e => {
//                 return (
//                     <li key={e.number}>{e.step}</li>
//                 )
//             }) :
//             <li>{recipeDetails.steps}</li> 
//         }
//         </ul>
//         </div>

//         <Link to='/home'><button className='backButton'> Go back to recipes</button></Link>




//         </div>
//     )
// }