// That's developping chronic.
/*

=======09/04/19


89. week-4 func - <Favorite/> footer stick bottom,
88. week-4 func - <Favorite/> arrow in item,
87. week-4 func - <Favorite/> click heart rm item
=======07/04/19
86. week-4 func - <FavoritePagination/>
85. after review - rm all shouldComponentUpdate
=======06/04/19
84. after review - CataloguePagination rm shouldComponentUpdate
83. after review - Catalogue.initCatalogue
82. cleaning after review
=======02/04/19
81. remove shouldComponentUpdate in <Catalogue/>
80. fixed Breadcrumbs- надо рендерить без главной страницы
79. Исправил App.js переход в /catalogue при клике в <Header/>
=======31/03/19
78. Breadcrumbs is done
!!! Исправить Sidebar css положение, и Заголовок категории в <Catalogue/>
77. Хлебные крошки in <ProductCard/>
=======30/03/19
76. Хлебные крошки
75. installed "react-through" and react-breadcrumbs-dynamic
74. <HeaderCartItem/>
=======28/03/19
73. make <HeaderCartItem/>
72. make Basket panel in <Header>:
=======26/03/19
71. экран Order - сделал стайл кнопки, удаление localStorage.cartId
=======25/03/19
70. сделал заказ оформлен
69. сделал createdOrder
68. Отправка данных - изменение корзины при каждом обновлении количества item, срабатывает дебаунс функции fetchUpdateProduct
сделал код OrderCaritem unique
67. !!! ПРОБЛЕМА: потенциальная, в OrderCart собираются данные в totalCollector, в нем заказы с одним id продукта но с разными размерами перезатрутся в один продукт.
=======22/03/19
66. realize WEEK-2 requirements
65. Header subcategory => clearFilterForm
64. !!! фильтры превалируют над категориями <Header />
=======21/03/19

63. realize СБРОС фильтра с перемаунтом Sidebar и перерисовкой всех продуктов.
Надо сделать СБРОСИТЬ - желательно перерисовать весь sidebar
62. сделал brand.
!!! фильтр по РАЗМЕР не дает результатов, видимо захардкодены нереальные размеры, при этомнегде получать разымеры.
61. realize <SidebarItemSlider put price in catalogueParams
60. <SidebarItemSlider debounced-вызов сбора формы
59. Заменил в fetchProducts params - теперь это массив.

??? как то беспокоит огроное количество ререндеров компонентов прежде чем они отрисуют нужную картинку - это вообще нормалььно? или нужно как то оптимизировать код? Или реакт сам всё оптимизирует и поэтому можно не заморачиваться?
=======20/03/19
58. realize all els <CatalogueSidebar/>, need to bind with FORM
57. !!!Запросы к серверу по женской обуви выдают размеры каблука 1-10.
??? стоило ли использовать npm package noUiSlider для реализации инпута-слайдера-установщика диапазона цены? Потратил неприлично много времени.

ИДЕЯ: CatalogueSidebar получает catalogueParams и обновляется - сбрасывает всю форму?


!!! приходящая макс цена категории не падает в Слайдер
56. realize SidebarItemSlider
!!!catalogueParams в App.js при загрузке categories выставляется на первую пришедшую категорию
=======18/03/19
55. discounted
54. realize <SidebarItemSeason
53. realize <SidebarItemReason
52. realize <SidebarItemColor
51. realize <SidebarItemCatalogue
50. <Catalogue/> название категории, кол-во товаров
??? Это нормально что компоненты по 100 раз вызывают свой метод render() прежде чем мы получаем нужный нам интерфейс на экране?
=======17/03/19
49. realize <CatalogueItem !!! стоит ли оставлять контейнером Link или <a>??? лишнее оформление
!!! размеры не приходят с fetchProducts - сервер не создает такое свойство, сбил болванку
48. realize <Catalogue
=======16/03/19
47. !!! сделал "В корзину". Если нет размера, то сервер не добавляет в корзину.
services.basketTwinklePic = {}; это ДОМ элемент мигалки
services.twinkleBasketPic = twinkleBasketPic;
46. в <ProductInfo запускаем f clickInBasket скролл и мигание
45. в <ProductCard оформление вИзбранное вКорзину
=======15/03/19
44. <SimilarSlider> - !!!та же Проблема перезапуска товара на странице ТОВАРА, не меняется содержимео
43. OverlookedSlider - показывает кроме Главного товара на СТранице Товара. Показывает все в <Catalogue>
!!!Проблема перезапуска товара на странице ТОВАРА, когда я в ВЫСМОТРЕЛИ нажимаю на товар. Меняется id но не меняется содержаение компонента. Можно использовать атрибут forceRefresh={true} в <BrowserRouter> но это приводит к перезагрузке всей страницы

=======13/03/19

42. clean services.js
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
