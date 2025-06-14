import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './RestaurantMenu.css'; // Assuming you'll update the CSS as well

const RestaurantMenu = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [menu, setMenu] = useState([]);
  const [restaurantInfo, setRestaurantInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Beliebte Gerichte');
  const [showModal, setShowModal] = useState(false);
  const [modalItem, setModalItem] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch('/api/api.php/restaurentdetail', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            deviceId: '1231231234',
            latitude: '7435242355',
            longitude: '774635423r',
            restid: id,
            restname: '',
            user: '123456',
            ipadd: '122.122.122.122'
          }),
        });

        if (!response.ok) throw new Error(`Server error: ${response.status}`);

        const data = await response.json();

        if (data?.[0]) {
          const res = data[0].Restaurant_Detail?.[0] || {};
          setRestaurantInfo({
            name: res.restaurant_name || res.name || 'Restaurant Name',
            address: res.address || res.restaurant_address || 'Address not available',
            image: res.image ? encodeURI(res.image) : (res.restaurant_image || res.cover_image || ''),
            minOrder: res.min_order || res.minimum_order || null,
            deliveryTime: res.delivery_time || null,
            rating: res.rating || null
          });
        }

        const menuHead = data?.[0]?.MenuItem?.MenuHead;
        const allItems = [];

        if (Array.isArray(menuHead)) {
          menuHead.forEach((category) => {
            (category.category_products || []).forEach((item) => {
              allItems.push({
                ...item,
                categoryName: category.category,
                categoryId: category.category_id
              });
            });
          });
        }

        setMenu(allItems);
      } catch (err) {
        setError(err.message || 'Failed to load menu');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchMenu();
    else {
      setError('Restaurant ID is required');
      setLoading(false);
    }
  }, [id]);

  const addToCart = (item) => {
    const existing = cart.find(c => c.id === (item.menu_item_id || item.id));
    if (existing) {
      setCart(cart.map(c => c.id === (item.menu_item_id || item.id) ? { ...c, quantity: c.quantity + 1 } : c));
    } else {
      setCart([...cart, {
        id: item.menu_item_id || item.id,
        name: item.name || item.menu_item_name || item.item_name || 'Unnamed Item',
        price: parseFloat(item.price || item.menu_item_price || item.item_price || 0),
        description: item.description || item.menu_item_description || '',
        quantity: 1
      }]);
    }
  };

  const removeFromCart = (id) => {
    const existing = cart.find(c => c.id === id);
    if (existing?.quantity > 1) {
      setCart(cart.map(c => c.id === id ? { ...c, quantity: c.quantity - 1 } : c));
    } else {
      setCart(cart.filter(c => c.id !== id));
    }
  };

  const getTotalPrice = () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  const categories = [...new Set(menu.map(item => item.categoryName))];
  const filteredMenu = selectedCategory === 'Beliebte Gerichte' ? menu : menu.filter(item => item.categoryName === selectedCategory);

  const handleShowInfo = (item) => {
    setModalItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setModalItem(null);
    setShowModal(false);
  };

  if (loading) return <div className="menu-loading-spinner">Loading menu...</div>;
  if (error) return <div className="menu-fetch-error">Error: {error}</div>;

  return (
    <div className="restaurant-menu-page">
      <div className="restaurant-detail-header">
        {restaurantInfo.image ? (
          <div className="restaurant-image-display">
            <img src={restaurantInfo.image} alt={restaurantInfo.name} className="restaurant-cover-image" />
            <div className="restaurant-info-overlay">
              <h1 className="restaurant-title">{restaurantInfo.name}</h1>
              <p className="restaurant-location">{restaurantInfo.address}</p>
              {restaurantInfo.minOrder && <div className="restaurant-min-order-tag">Min. {restaurantInfo.minOrder} €</div>}
            </div>
          </div>
        ) : (
          <div className="restaurant-info-without-image">
            <h1 className="restaurant-title">{restaurantInfo.name}</h1>
            <p className="restaurant-location">{restaurantInfo.address}</p>
            {restaurantInfo.minOrder && <div className="restaurant-min-order-tag">Min. {restaurantInfo.minOrder} €</div>}
          </div>
        )}
      </div>

       <div className="menu-category-navigation">
            {categories.map(cat => (
              <button
                key={cat}
                className={`category-nav-btn ${selectedCategory === cat ? 'active-category' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
      <div className="menu-and-cart-container">
        <div className="menu-items-section">
          <h2 className="current-category-title">{selectedCategory}</h2>
          <div className="menu-items-grid">
            {filteredMenu.length === 0 ? (
              <p className="no-menu-items">No items found in this category.</p>
            ) : filteredMenu.map(item => (
              <div
  key={item.menu_item_id || item.id}
  className="menu-item-card-display"
  onClick={() => addToCart(item)}  // Entire card is clickable
  style={{ cursor: 'pointer' }}
>
  <div className="menu-item-details">
    <h4 className="menu-item-heading">{item.name || item.menu_item_name || item.item_name}</h4>
    <p className="menu-item-description-text">
      ab {item.price || item.menu_item_price || 'N/A'}€ Erstelle nach deinem Geschmack.
    </p>
    <p className="menu-item-price-text">{item.price || item.menu_item_price || 'N/A'} €</p>

    <div className="menu-item-actions">
      <button
        className="info-icon-btn"
        onClick={(e) => {
          e.stopPropagation();       // Prevent triggering card click
          handleShowInfo(item);
        }}
      >
        i
      </button>
      <button
        className="configure-item-btn"
        onClick={(e) => {
          e.stopPropagation();       // Prevent triggering card click
          addToCart(item);
        }}
      >
        Konfiguriere
      </button>
      <button
        className="add-to-cart-btn"
        onClick={(e) => {
          e.stopPropagation();       // Prevent triggering card click
          addToCart(item);
        }}
      >
        +
      </button>
    </div>
  </div>

  <img
    src={item.image ? encodeURI(item.image) : '/default.jpg'}
    alt={item.name || 'Menu Item'}
    className="menu-item-thumbnail"
  />
</div>

            ))}
          </div>
        </div>

        <div className="order-summary-panel">
          <div className="order-summary-card">
            <h3 className="order-summary-header">Order Details</h3>
            {cart.length === 0 ? (
              <p className="empty-cart-message">Your cart is empty</p>
            ) : (
              <>
                <div className="cart-items-list">
                  {cart.map(item => (
                    <div key={item.id} className="cart-item-entry">
                      <div className="cart-item-info-display">
                        <h4>{item.name}</h4>
                        <p>{item.description}</p>
                        <span className="cart-item-price-display">{item.price.toFixed(2)} €</span>
                      </div>
                      <div className="cart-item-quantity-controls">
                        <button onClick={() => removeFromCart(item.id)} className="quantity-control-btn">-</button>
                        <span className="item-quantity-value">{item.quantity}</span>
                        <button onClick={() => addToCart(item)} className="quantity-control-btn">+</button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="order-total-row">
                  <span>TOTAL</span>
                  <span>{getTotalPrice()} €</span>
                </div>
                <div className="delivery-pickup-options">
                  <label className="radio-option-container">
                    <input type="radio" name="delivery-option" value="delivery" />
                    <span>Delivery</span>
                  </label>
                  <label className="radio-option-container">
                    <input type="radio" name="delivery-option" value="pickup" defaultChecked />
                    <span>Pickup</span>
                  </label>
                </div>
                <button
                  className="preorder-button"
                  onClick={() => navigate('/order-details', { state: { cart, restaurantInfo } })}
                >
                  Pre-Order
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && modalItem && (
        <div className="item-info-modal-wrapper">
          <div className="modal-backdrop" onClick={handleCloseModal}>
            <div className="modal-content-container" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header-section">
                <h3>{modalItem.name || modalItem.menu_item_name}</h3>
                <button className="modal-close-button" onClick={handleCloseModal}>×</button>
              </div>

              <img
                src={modalItem.image ? encodeURI(modalItem.image) : '/default.jpg'}
                alt={modalItem.name || 'Menu Image'}
                className="modal-item-image"
              />
              <p><strong>Allergy Information:</strong> {modalItem.allergy || 'Not available'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantMenu;