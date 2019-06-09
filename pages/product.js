import { connect } from 'react-redux';

const Product = ({ title }) => {
    return (
        <div>
            Product: {title}
        </div>
    )
}

const mapState = state => ({
    title: state.product._source.original_title
})

export default Page(
    connect(mapState)(Product),
    async (req, { dispatch }) => {
     const product = dispatch(fetchProduct(get(req, 'query.id')));
     await Promise.all([product]);
    },
);
