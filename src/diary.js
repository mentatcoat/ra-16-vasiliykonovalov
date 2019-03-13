// That's developping chronic.
/*

!!! вся херня запускается в <App/>

=======13/03/19

41. remake <ProductCard
40. remake <OverlookedSlider
39. fixed problem fetchProduct in Order by using Promise.all
=======12/03/19
38. правки в <ProductCard <ProductInfo <ProductInfoSizes , <ProductCard получает продуктв самостоятельно
=======05/03/19
37. <Catalogue getSortedProducts.
36. Сдела вместо Link подкатегори - history lib createHistory=> browserHistory.push()
!!!??? можно ли использовать window.location.pathname - если не вижу смысла <a переделывать в Link?
35. подкатегории высылают в <App params, для <Catalogue
34. подкатегори  в <Header
33. Кнопки Profile и Basket в <Header>
=======03/03/19
32. <NewDeals> пишу НОВИНКИ слайдер
31. <Subscribe />
=======02/03/19
СДЕЛАТЬ в OrderCartItem отправку fetch изменение карзины при изменении amount
30. <Order> <OrdrCart> <OrderCartItem>
29. !!! изменил класс basket-item__quantity__incart добавил incart , чтобы небыло конфликта классов
28. in <ProductInfo   basketAmountChange()
27. в <ProductInfo  isAvailable !!!у них ошибка 'avalible'
=======01/03/19
СДЕЛАТЬ "в наличии"
26. <ProductInfoSizes >
25. <ProductInfo >
24. связка Main pic и ProductSlider. Увеличение main pic.
23. подстановка Main pic в ProductCard
22. <ProductSlider/>
!!! в products.json в товаре id 20 удвоил количество фото
21. <ProductCard/>
!!! нужно сделать в OverlookedSlider в каждой картинке link=> переход на страницу товара и в App.state{currentProduct: ${id}}
20. сделал <Favorite/>
19. Исправил <OverlookedSlider/> - при снижении количества картинокю.
=======28/02/19
18. <OverlookedSlider/> remake
17. Footer убрал checked=""
//??? можно в localStorage добавить свои данные - например id просмотренных товаров
16. <OverlookedSlider />
15. <CatalogueSidebar />
*Главная страница закончена
14. NewDeals Component.
13. Footer Component. // !!! не работает input ВСЕ
=======27/02/19
12. сделал AboutUs.js
11. сделал <Sales /> -
??? стиль от болванки <App /> накладывался на элементы <Sales /> в итоге отключил App.css - это нормально ?
10. сделал <Slider /> и обернул slider.js в функцию и экспортировал, чтобы в Slider запускался этот код в didMount()
??? так вообще стоит делать или это фейл?
??? картинки только по import можно отедльно делать?
9. services.fetchCreateOrder
8. services.fetchUpdateProduct = fetchUpdateProduct;
7. services.fetchGetCart = fetchGetCart;
6. services.fetchCreateCart
5. services.fetchProduct(33);
4. servises.fetchProducts
3.services.fetchFeatured = fetchFeatured;
========26/02/19
2. services.js создан fetcher, получает те же категрогии что дает categories.json
1. Link  в Header Component







*/
