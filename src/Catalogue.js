import React, { Component } from 'react';
import './App.css';
import { Switch, Route, Link } from 'react-router-dom';
import './css/normalize.css';
import './css/font-awesome.min.css';
import './css/style.css';
import './css/style-catalogue.css';
import CatalogueSidebar from './CatalogueSidebar';
import OverlookedSlider from './OverlookedSlider';
import CatalogueItem from './CatalogueItem';
import CataloguePagination from './CataloguePagination';
import PropTypes from 'prop-types';
import services from './services';
import {Breadcrumbs, BreadcrumbsItem} from 'react-breadcrumbs-dynamic';
import defaultCatalogueParams from './defaultCatalogueParams';
import SidebarItemCatalogue from './SidebarItemCatalogue';
import SidebarItemColor from './SidebarItemColor';
import SidebarItemReason from './SidebarItemReason';
import SidebarItemSeason from './SidebarItemSeason';
import SidebarItemSlider from './SidebarItemSlider';
import SidebarItemSize from './SidebarItemSize';
import SidebarItemHeelSize from './SidebarItemHeelSize';
import SidebarItemBrand from './SidebarItemBrand';
import SidebarItemDiscounted from './SidebarItemDiscounted';
import isEqual from 'react-fast-compare';
import productsJSON from './data/productsLarge.json';

class Catalogue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      catalogueParams: this.props.catalogueParams || defaultCatalogueParams,
      isShownSidebar: true,
      categories: this.props.categories,
      sortedProducts: '',
      sortedProductsAmount: null,
      currentPage: '',
      pagesAmount: '',
    };
    this.categoryMaxPrice;
    this.categoryId;

    this.getSortedProducts = (params)=>{
      this.props.preloaderOn();
      services.fetchProducts(params)
        .then(data=>{
          this.props.preloaderOff();
          this.setState({
            sortedProducts: data.data,
            sortedProductsAmount: data.goods,
            currentPage: data.page,
            pagesAmount: data.pages,
        }
      );
        });

    };

    this.getCurrentCategoryId = (catalogueParams)=>{
      if(!catalogueParams) return;
      if(catalogueParams.find(el=>el[0]==='categoryId'))
      this.categoryId = catalogueParams.find(el=>el[0]==='categoryId')[1];
    };

//  Прошлый вопрос:
    // ??? Вместо shouldComponentUpdate который ниже закомментен сделал эту функцию init() и функцию this.setStateCatalogueParams, которая доступна из services, чтобы менять state этого компонента. Правильно ли так делать? Могу ли распространить подобный подход "обновлять state через services" на другие компоненты с shouldComponentUpdate?

// Выше вопрос, после которого ты рекомендовал в initCatalogue() применить Promise.all , чтобы сократить вызов setState() до одного раза, но там setState() итак используется 1 раз (только в функции this.getSortedProducts() ), поэтому считаю что не надо переделывать. Если это принципиально в этом модуле - дай знать.

    this.initCatalogue();

    this.resetFilter = ()=>{
      this.setState({
        catalogueParams: defaultCatalogueParams
      });
    };

    this.onChangeParam = (e, paramName, paramValue) => {
      if(paramName || paramValue) {

        let params = Object.assign(
          {},
          this.state.catalogueParams ,
          {[paramName]: paramValue} );
        this.setState({
          catalogueParams: params
        }, this.initCatalogue);
      } else {
        let params = Object.assign(
          {},
          this.state.catalogueParams ,
          {[e.currentTarget.name]: e.currentTarget.value} );
        this.setState({
          catalogueParams: params
        }, this.initCatalogue);
      }

    }
  }

  getCategoryMaxPrice(categoryIdNumber) {
    if(!categoryIdNumber) return;
    services.fetchProducts({
      categoryId: categoryIdNumber,
      sortBy: 'price',
      maxPrice: 1000000
    }).then(data=>{
      let result = data.data[0].price;
      result = Math.ceil(result/100) * 100;
      this.setState({categoryMaxPrice: result});
    })
    .catch((err) => {
    });
  }

  initCatalogue() {
    if(this.state.catalogueParams) {
      this.getSortedProducts(this.state.catalogueParams);
      this.getCategoryMaxPrice(this.state.catalogueParams.categoryId);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if( this.props.catalogueParams !== prevProps.catalogueParams) {
      this.setState({catalogueParams: this.props.catalogueParams},
      () => this.initCatalogue()
      );
    }
    if(!isEqual(this.state.catalogueParams, prevState.catalogueParams)) {
      this.initCatalogue();
    }
  }

  render() {
    let categoryIdPair, categoryTitle;
    categoryTitle = 'Категория не задана';

    if(this.props.categories && this.state.catalogueParams.categoryId) {
      categoryTitle = this.props.categories.find(el=>+el.id===+this.state.catalogueParams.categoryId).title;
    }

    return (
      <div className="just-wrapper">

        <Breadcrumbs
          item={Link}
          container={'div'}
          containerProps={{
            className: 'site-path__items'
          }}
          finalItem={'span'}
          finalProps={{
            className: 'site-path__item',
            onClick: null
          }}
        />

        <BreadcrumbsItem
          to='/'
          className='site-path__item'
        >
          Главная
        </BreadcrumbsItem>

        {this.state.catalogueParams.search
        ?
        <BreadcrumbsItem
         to='/catalogue'
         className='site-path__item'
        >
         Результаты поиска
        </BreadcrumbsItem>
        :
        <BreadcrumbsItem
         to='/catalogue'
         className='site-path__item'
        >
         {categoryTitle}
        </BreadcrumbsItem>
        }

        {/*<!-- Тело каталога с сайдбаром -->*/}
        <main className="product-catalogue">

        {this.state.isShownSidebar &&
        <CatalogueSidebar

          onChangeFilter={this.onChangeFilter}
          onChangeParam={this.onChangeParam}
          resetFilter={this.resetFilter}
        >

          <SidebarItemCatalogue
          value={this.state.catalogueParams.type}
          onChangeParam={this.onChangeParam}
          items={this.props.types}
           />
          <div className="separator-150 separator-150-1"></div>

          <SidebarItemSlider
          categoryMaxPrice={this.state.categoryMaxPrice}
          onChangeParam={this.onChangeParam}
          />
          <div className="separator-150 separator-150-1"></div>

          <SidebarItemColor     value={this.state.catalogueParams.color}
          onChangeParam={this.onChangeParam}
          items={this.props.colors}
          />
          <div className="separator-150 separator-150-1"></div>

          <SidebarItemSize           onChangeParam={this.onChangeParam}
          sizes={this.state.catalogueParams.size}
          />
          <div className="separator-150 separator-150-1"></div>

          <SidebarItemHeelSize           onChangeParam={this.onChangeParam}
          sizes={this.state.catalogueParams.heelSize}
          />
          <div className="separator-150 separator-150-1"></div>

          <SidebarItemReason
          value={this.state.catalogueParams.reason}
          onChangeParam={this.onChangeParam}
          items={this.props.reasons}
          />
          <div className="separator-150 separator-150-1"></div>

          <SidebarItemSeason       value={this.state.catalogueParams.season}
          onChangeParam={this.onChangeParam}
          />
          <div className="separator-150 separator-150-1"></div>

          <SidebarItemBrand onChangeParam={this.onChangeParam} />

          <SidebarItemDiscounted onChangeParam={this.onChangeParam}
          value={this.state.catalogueParams.discounted}
          />

        </CatalogueSidebar>
      }

        {/*<!-- Основной контент каталога -->*/}
          <section className="product-catalogue-content">
            {/*<!-- Голова каталога с названием раздела и сортировкой -->*/}
            <section className="product-catalogue__head">
              <div className="product-catalogue__section-title">
                <h2 className="section-name">{this.state.catalogueParams.search ? 'Результаты поиска' : categoryTitle}</h2><span className="amount">{typeof this.state.sortedProductsAmount === 'number' && `${this.state.sortedProductsAmount.toLocaleString()} товара`}</span>
              </div>

              <div className="product-catalogue__sort-by">
                <p className="sort-by">Сортировать</p>
                <select onChange={this.onChangeParam} value={this.state.catalogueParams.sortBy} form='filterForm' name="sortBy" id="sorting">
                  <option value="price">по цене</option>
                  <option value="popularity">по популярности</option>
                </select>
              </div>

            </section>

            {/*<!-- Список товаров каталога -->*/}

            <section  className="product-catalogue__item-list">
              {/*<!-- Товары -->*/}

              {this.state.sortedProducts && this.state.sortedProducts.map(
                product=>
                <CatalogueItem
                key={product.id}
                product={product}
                />

              )}

            </section>

            {/*<!-- Пагинация под каталогом -->*/}

            {this.state.sortedProducts &&
            <CataloguePagination
            currentPage={this.state.currentPage} pagesAmount={this.state.pagesAmount}
            onChangeParam={this.onChangeParam}
            />}

          </section>

        </main>

        {/*<!-- Слайдер внизу каталога  -->*/}

        <OverlookedSlider match={this.props.match} />

      </div>
    );
  }
}
// ??? Пожалуй не нужно в PropTypes указывать props которые придут от Route - history, location, match. Ведь с ними невозможно напутать. Или желательно их тоже указывать?

// ??? в виду того, что в ТЗ не было упоминания как получать "размеры" обуви я прописал их в catalogueParams, которые напрямую определяют какие продуты отображаются на экране. Дайте критику по "установке в начальном рендере defaultCatalogueParams" в компоненте <Catalogue/>.

Catalogue.propTypes = {
  catalogueParams : PropTypes.array.isRequired,
  categories : PropTypes.array,
  setCatalogueParams: PropTypes.func.isRequired
};

export default Catalogue;
