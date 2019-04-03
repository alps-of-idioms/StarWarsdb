import React, { PureComponent } from "react";
import Spinner from "../spinner";
//import ErrorButton from "../error-button";
import "./item-details.css";
import PhotoManager from "../modal";
//import ErrorIndicator from "../error-indicator";

const Record = ({ item, field, label }, indx) => {
  return (
    <li key={indx} className="list-group-item">
      <span className="term">{label}</span>
      <span className="float-right">{item[field]}</span>
    </li>
  );
};

export default class ItemDetails extends PureComponent {
  state = {
    item: null,
    loading: false,
    image: null,
    error: false
  };

  componentDidMount() {
    this.updateItem();
  }

  /* shouldComponentUpdate(nextProps, nextState) {
    if (this.state.person !== nextState.item) {
      return true;
    }

    return false;
  } */

  updateItem() {
    const { itemId, getData, getImageUrl } = this.props;
    if (!itemId) {
      return;
    }
    this.setState(state => {
      return {
        loading: true,
        error: false
      };
    });

    getData(itemId)
      .then(item => {
        getImageUrl(item).then(imageUrl => {
          this.setState(state => {
            return {
              item,
              loading: false,
              image: imageUrl
            };
          });
        });
      })
      .catch(() =>
        this.setState({
          loading: false,
          error: true
        })
      );
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.itemId !== prevProps.itemId ||
      this.props.getData !== prevProps.getData ||
      this.props.getImageUrl !== prevProps.getImageUrl
    ) {
      this.updateItem();
    }
  }

  render() {
    console.log("render Person details", this.props);
    const { item, loading, image, error } = this.state;
    const prevMessage =
      !item && !loading && !error ? (
        <span>Select an item from a list</span>
      ) : null;
    const spinner = loading ? <Spinner /> : null;
    //const errorView = error ? <ErrorIndicator /> : null;
    const view =
      item && !loading ? (
        <ViewDetailss
          item={item}
          image={image}
          children={this.props.children}
        />
      ) : null;
    return (
      <div className="item-details card">
        {prevMessage}
        {spinner}
        {view}
        {/*errorView*/}
      </div>
    );
  }
}

const ViewDetailss = ({ item, image, children }) => {
  console.log(children);
  const { name } = item;
  //const { image } = image;
  return (
    <React.Fragment>
      <PhotoManager url={image} />
      <div className="card-body">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          {React.Children.map(children, (child, indx) => {
            return React.cloneElement(child, { item }, indx);
          })}
        </ul>
        {/* {<ErrorButton />} */}
      </div>
    </React.Fragment>
  );
};

export { Record };
