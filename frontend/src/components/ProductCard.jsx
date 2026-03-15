const ProductCard = ({ post, onClick }) => {
  return (
    <div
      className="card h-100 shadow-sm border-0"
      style={{ cursor: 'pointer' }}
      onClick={onClick}
    >
      <img
        src={post.image || 'https://via.placeholder.com/300x200?text=Sin+imagen'}
        alt={post.title}
        className="card-img-top"
        style={{ height: '180px', objectFit: 'cover' }}
      />

      <div className="card-body">
        <span className="badge mb-2 fw-bold"
              style={{ backgroundColor: '#F5C518', color: '#000' }}>
          {post.category}
        </span>

        <h6 className="card-title fw-bold" style={{ color: '#1B2A6B' }}>
          {post.title}
        </h6>

        <p className="fw-bold mb-1" style={{ color: '#E8851A' }}>
          ${Number(post.price).toLocaleString('es-CL')}
        </p>

        <p className="text-muted small mb-0">
          👤 {post.seller_name || 'Vendedor'}
        </p>
      </div>
    </div>
  )
}

export default ProductCard