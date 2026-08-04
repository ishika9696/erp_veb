import React, { useState } from 'react';
import { POS_PRODUCTS } from '../../../data/mockData';
import Modal from '../../ui/Modal';
import { useApp } from '../../../context/AppContext';
import { ShoppingBag, Search, Plus, Minus, Trash2, CreditCard, DollarSign, QrCode, CheckCircle2, Receipt } from 'lucide-react';

const PosView = () => {
  const { addToast } = useApp();
  const [products] = useState(POS_PRODUCTS);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);

  // Checkout Modal State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('credit'); // 'credit' | 'cash' | 'qr'
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        return [...prev, { ...product, qty: 1 }];
      }
    });
    addToast(`Added ${product.name} to POS Cart`, "info");
  };

  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const applyDiscount = () => {
    if (discountCode.toUpperCase() === 'PROMO10') {
      setAppliedDiscount(0.10);
      addToast("10% Promo Discount Applied!", "success");
    } else {
      addToast("Invalid Promo Code (Try PROMO10)", "error");
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesCat = activeCategory === 'All' || p.category === activeCategory;
    const matchesQuery = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.sku.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const discountVal = subtotal * appliedDiscount;
  const taxVal = (subtotal - discountVal) * 0.10;
  const grandTotal = subtotal - discountVal + taxVal;

  const handleCompleteSale = () => {
    setIsCheckoutOpen(false);
    setCart([]);
    setAppliedDiscount(0);
    setDiscountCode('');
    addToast(`POS Sale Completed! Grand Total: $${grandTotal.toFixed(2)}`, "success");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left 2 Cols: Product Catalog Grid */}
      <div className="lg:col-span-2 space-y-4">
        {/* Search & Category Filter Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search POS items or scan SKU barcode..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 pl-9 pr-4 py-2 text-xs text-slate-900 dark:text-white"
            />
          </div>

          <div className="flex items-center gap-1 rounded-lg bg-slate-100 dark:bg-slate-950 p-1 border border-slate-200 dark:border-slate-800 text-xs font-semibold">
            {['All', 'Software', 'Hardware', 'Add-ons'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-md transition-all ${
                  activeCategory === cat
                    ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => addToCart(product)}
              className="group rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-2xs hover:shadow-md transition-all cursor-pointer hover:border-indigo-300 dark:hover:border-indigo-800"
            >
              <div className="h-36 w-full overflow-hidden bg-slate-100 dark:bg-slate-950 relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2 right-2 text-[10px] font-bold bg-slate-900/80 text-white backdrop-blur-xs px-2 py-0.5 rounded-full">
                  Stock: {product.stock}
                </span>
              </div>

              <div className="p-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase">{product.sku}</span>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-0.5 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                  {product.name}
                </h4>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400">
                    ${product.price.toFixed(2)}
                  </span>
                  <button className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Col: Interactive Cart Sidebar */}
      <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs flex flex-col justify-between h-fit min-h-[550px]">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">
                POS Cart
              </h3>
            </div>
            <span className="text-xs font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 px-2.5 py-1 rounded-full">
              {cart.reduce((a, b) => a + b.qty, 0)} Items
            </span>
          </div>

          {/* Cart Item List */}
          <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-72 overflow-y-auto my-4">
            {cart.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">
                Cart is currently empty. Click any item from catalog to add.
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="py-3 flex items-center justify-between text-xs">
                  <div className="flex-1 pr-2">
                    <span className="font-bold block text-slate-900 dark:text-white truncate">{item.name}</span>
                    <span className="text-slate-400 text-[10px]">${item.price.toFixed(2)} each</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
                      <button
                        onClick={() => updateQty(item.id, -1)}
                        className="px-2 py-1 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="px-2 font-bold text-slate-900 dark:text-white">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.id, 1)}
                        className="px-2 py-1 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-rose-500 hover:text-rose-700 p-1"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Promo Code + Totals Footer */}
        <div className="border-t border-slate-200 dark:border-slate-800 pt-4 space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Promo Code (e.g. PROMO10)"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              className="flex-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 px-3 py-1.5 text-xs text-slate-900 dark:text-white"
            />
            <button
              onClick={applyDiscount}
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-semibold text-slate-700 dark:text-slate-300"
            >
              Apply
            </button>
          </div>

          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-500">
              <span>Subtotal</span>
              <span className="font-semibold text-slate-900 dark:text-white">${subtotal.toFixed(2)}</span>
            </div>
            {appliedDiscount > 0 && (
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>Promo Discount (10%)</span>
                <span>-${discountVal.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-500">
              <span>Estimated Tax (10%)</span>
              <span className="font-semibold text-slate-900 dark:text-white">${taxVal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-base font-extrabold text-slate-900 dark:text-white border-t border-slate-100 dark:border-slate-800 pt-2">
              <span>Grand Total</span>
              <span className="text-indigo-600 dark:text-indigo-400">${grandTotal.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(true)}
            disabled={cart.length === 0}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs shadow-md shadow-indigo-500/20 transition-all flex items-center justify-center gap-2"
          >
            <CreditCard className="h-4 w-4" />
            Proceed to Checkout
          </button>
        </div>
      </div>

      {/* Checkout Modal */}
      <Modal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        title="POS Terminal Checkout"
      >
        <div className="space-y-6">
          <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
            <span className="text-xs text-slate-400">Total Amount Due</span>
            <h2 className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-1">
              ${grandTotal.toFixed(2)}
            </h2>
          </div>

          {/* Payment Method Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Select Payment Method
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('credit')}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-xs font-semibold transition-all ${
                  paymentMethod === 'credit'
                    ? 'border-indigo-500 bg-indigo-50/60 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400'
                    : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                <CreditCard className="h-5 w-5" />
                Credit Card
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cash')}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-xs font-semibold transition-all ${
                  paymentMethod === 'cash'
                    ? 'border-indigo-500 bg-indigo-50/60 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400'
                    : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                <DollarSign className="h-5 w-5" />
                Cash
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('qr')}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-xs font-semibold transition-all ${
                  paymentMethod === 'qr'
                    ? 'border-indigo-500 bg-indigo-50/60 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400'
                    : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                <QrCode className="h-5 w-5" />
                QR Pay
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-2">
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              onClick={handleCompleteSale}
              className="px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md flex items-center gap-1.5"
            >
              <CheckCircle2 className="h-4 w-4" />
              Complete Transaction
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PosView;
