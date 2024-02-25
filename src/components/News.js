// import React, { Component } from 'react'
// import NewsItem from '../NewsItem'
// import Spinner from './Spinner'
// import PropTypes from 'prop-types' 


// export class News extends Component {
    
//   static defaultProps = {
//     country : 'in',
//     pageSize : 6,
//     catagory : 'general'
//   }

//   static propTypes = {
//     country : PropTypes.string,
//     pageSize : PropTypes.number,
//     category : PropTypes.string
//   }
      
//     constructor(){
//         super();
//         this.state={
//             articles:[],
//             loading:false,
//             page:1
//         }
        
//     }

//    async componentDidMount(){
//     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9f5e05517f704d82a332ae196fd2fcf3&pageSize=${this.props.pageSize}`
//     this.setState({loading:true});
//     let data = await fetch(url);
//     let parsedData = await data.json();
//     console.log(parsedData);
//     this.setState({articles: parsedData.articles,
//        totalResults: parsedData.totalResults,
//        loading: false
//       });
//    }
        
//    handleprevClick= async()=>{
//         console.log("previous")
//         console.log("previous")
//     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9f5e05517f704d82a332ae196fd2fcf3&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
//     this.setState({loading:true})
//     let data = await fetch(url);
//     let parsedData = await data.json();
//     console.log(parsedData);
    
//     this.setState({
//       page : this.state.page - 1,
//       articles: parsedData.articles,
//       loading: false
//     })
//    }
   

//    handleNextClick= async()=>{
//     console.log("previous")
//     if(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)){

//     }
//     else{
//     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9f5e05517f704d82a332ae196fd2fcf3&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
//     this.setState({loading:true});
//     let data = await fetch(url);
//     let parsedData = await data.json();
//     console.log(parsedData);
    
//     this.setState({
//       page : this.state.page + 1,
//       articles: parsedData.articles,
//       loading: false
//     })}
//    }

//   render() {
//     return (
//       <div className="container mx-3 my-3 text-center">
//         <h1>NewsInsta-Top Headlines</h1>
//         {this.state.loading && <Spinner/>}
//         <div className="row my-4 mx-4 mb-4">
//         {!this.state.loading && this.state.articles.map((element) => (
//     <div className="col-md-4" key={element.url}>
//         <NewsItem
//             title={element.title ? element.title.slice(0, 40) : ''}
//             description={element.description ? element.description.slice(0, 60) : ''}
//             imageUrl={element.urlToImage}
//             newsUrl={element.url}
//         />
//     </div>
// ))}

//   </div>
//     <div className="d-flex justify-content-between">
//         <button disabled = {this.state.page<=1} type="button" className="btn btn-dark btn-sm" onClick={this.handleprevClick}> &larr; Previous</button>
//         <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark btn-sm" onClick={this.handleNextClick}> Next &rarr;</button>
//     </div>
//   </div>
//     )
//   }
// }

// export default News
import React, { Component } from 'react';
import NewsItem from '../NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 6,
    category: 'general',
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.props.category} - NewsInsta`;
  }

  async fetchData() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9f5e05517f704d82a332ae196fd2fcf3&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    console.log(data);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }

  async componentDidMount() {
    this.fetchData();
  }

  async componentDidUpdate(prevProps) {
    // Check if the category prop has changed
    if (this.props.category !== prevProps.category) {
      this.fetchData();
    }
  }  


  handlePrevClick = async () => {
    console.log('previous');
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9f5e05517f704d82a332ae196fd2fcf3&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);

    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false,
    });
  };

  handleNextClick = async () => {
    console.log('next');
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {
      // Handle the case where there are no more pages
    } else {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9f5e05517f704d82a332ae196fd2fcf3&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true });
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);

      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false,
      });
    }
  };

  // fetchMoreData = async () => {
  //   this.setState({ loading: true });
     
  //     let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9f5e05517f704d82a332ae196fd2fcf3&pageSize=${this.props.pageSize}`;
   
  //   let data = await fetch(url);
  //   let parsedData = await data.json();
   
  //   this.setState( (prevState) => ({
  //     page: this.state.page+1 ,
  //     articles: prevState.articles.concat(parsedData.articles),
  //     totalResults: parsedData.totalResults,
  //     loading: false,
  //   }))};

    fetchMoreData = async () => {
      this.setState({ loading: true });
    
      let nextPage = this.state.page + 1;
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9f5e05517f704d82a332ae196fd2fcf3&page=${nextPage}&pageSize=${this.props.pageSize}`;
    
      try {
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
    
        this.setState((prevState) => ({
          page: nextPage,
          articles: prevState.articles.concat(parsedData.articles),
          totalResults: parsedData.totalResults,
          loading: false,
        }));
      } catch (error) {
        console.error('Error fetching more data:', error);
        this.setState({ loading: false });
      }
    };
    

  
  

  render() {
        return (
          <div className="container mx-3 my-3 text-center">
            <h1>NewsInsta-Top {this.props.category} Headlines</h1>
            {/* {this.state.loading && <Spinner/>} */}
            <div className="row-my-4 ">
            <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
          loading = {this.state.loading}
          className='row my-4 mx-4'
        >
            {this.state.articles.map((element) => (
        <div className="col-md-4" key={element.url}>
            <NewsItem
                title={element.title ? element.title.slice(0, 40) : ''}
                description={element.description ? element.description.slice(0, 60) : ''}
                imageUrl={element.urlToImage}
                newsUrl={element.url}
                date={element.publishedAt}
            />
        </div>
        
    ))}
    </InfiniteScroll> 

      </div>
      </div>
        )
      }
    }
    
    export default News
