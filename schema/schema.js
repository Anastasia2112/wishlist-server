const graphql = require('graphql');

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList } = graphql;

const wishes = [
    { id: '1', name: 'Пылесос', link: 'http...', price: 18000, img: 'допустим, картинка', category: 'Техника', desc: 'Можно будет докупить моющую насадку' },
    { id: '2', name: 'Кроссовки', link: 'http...', price: 5000, img: 'допустим, картинка', category: 'Обувь', desc: 'Беговые для танцев' },
    { id: '3', name: 'Машина', link: 'http...', price: 350000, img: 'допустим, картинка', category: 'Авто', desc: 'Мазда 3/6' },
    { id: '4', name: 'Ботинки', link: 'http...', price: 350000, img: 'допустим, картинка', category: 'Обувь', desc: 'На осень' },
    { id: '5', name: 'Мультипекарь', link: 'http...', price: 350000, img: 'допустим, картинка', category: 'Техника', desc: 'Вафельница + гриль' },
];

const WishType = new GraphQLObjectType({
    name: 'Wish',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        link: { type: GraphQLString },
        price: { type: GraphQLInt },
        img: { type: GraphQLString },
        category: { type: GraphQLString },
        desc: { type: GraphQLString }
    })
});

const rootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        getWishById: {
            type: WishType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return wishes.find(wish => wish.id === args.id);
            }
        },
        getAllWishes: {
            type: new GraphQLList(WishType),
            resolve(parent, args) {
                return wishes
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: rootQuery
})