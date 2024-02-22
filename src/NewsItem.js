import React, { Component } from 'react'

export class NewsItem extends Component {
    
  render() {
    let {title , description , imageUrl , newsUrl , date} = this.props;
    return (
      <div>
        <div className="card" style= {{width : "18rem"}}>
            <img src={!imageUrl?"https://t4.ftcdn.net/jpg/03/18/27/83/360_F_318278322_5XZE9O10xz8mpundHqGBDzukYfw9HOoD.jpg":imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}...</h5>
                <p className="card-text">{description}...</p>
                <p className="card-text"><small className="text-muted">{new Date(date).toGMTString()}</small></p>
                <a href={newsUrl} target='_blank' className="btn  btn-sm btn-dark">Read More</a>
            </div>
            </div>
           
      </div>
      
    )
  }
}

export default NewsItem
