import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import StatCard from '../../ui/StatCard';
import Badge from '../../ui/Badge';
import {
  FINANCE_ESTIMATES,
  INITIAL_INVOICES,
  FINANCE_PAYMENTS,
  FINANCE_CREDIT_NOTES,
  FINANCE_EXPENSES,
  BANK_ACCOUNTS,
  BANK_RECONCILIATION,
  FINANCIAL_OVERVIEW_DATA,
  SUPPLIER_DIRECTORY
} from '../../../data/mockData';
import {
  Receipt,
  Plus,
  Building2,
  CheckCircle,
  Clock,
  AlertTriangle,
  DollarSign,
  TrendingUp,
  CreditCard,
  FileText,
  RefreshCw,
  Eye,
  Download,
  Send,
  ArrowRight,
  ArrowUpRight,
  Check,
  X,
  Filter,
  Search,
  ChevronRight,
  Printer,
  ShieldCheck,
  CornerDownRight,
  Calendar,
  Layers,
  Percent,
  CheckSquare,
  Pencil,
  Copy,
  Trash2,
  Truck,
  ShoppingCart,
  HelpCircle,
  Info,
  ExternalLink
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const AccountingView = () => {
  const {
    addToast,
    purchaseOrders,
    setPurchaseOrders,
    bills,
    setBills,
    addPurchaseOrder,
    updatePurchaseOrder,
    deletePurchaseOrder,
    convertPoToPurchaseBill
  } = useApp();

  // Navigation Tabs
  const [activeTab, setActiveTab] = useState('invoices');

  // Master Data States
  const [estimates, setEstimates] = useState(FINANCE_ESTIMATES);
  const [invoices, setInvoices] = useState(INITIAL_INVOICES);
  const [payments, setPayments] = useState(FINANCE_PAYMENTS);
  const [creditNotes, setCreditNotes] = useState(FINANCE_CREDIT_NOTES);
  const [expenses, setExpenses] = useState(FINANCE_EXPENSES);
  const [bankReconciles, setBankReconciles] = useState(BANK_RECONCILIATION);

  // Filters & Selection States
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [methodFilter, setMethodFilter] = useState('All');
  const [poTypeFilter, setPoTypeFilter] = useState('All');
  const [selectedPaymentIds, setSelectedPaymentIds] = useState([]);
  const [selectedPoIds, setSelectedPoIds] = useState([]);

  // Active Document View Modal
  const [activeDocView, setActiveDocView] = useState(null); // { type: 'invoice'|'estimate'|'creditnote'|'po'|'bill', data: obj }

  // Create Modals
  const [showCreateEstimateModal, setShowCreateEstimateModal] = useState(false);
  const [showCreateInvoiceModal, setShowCreateInvoiceModal] = useState(false);
  const [showCreatePoModal, setShowCreatePoModal] = useState(false);
  const [showCreateExpenseModal, setShowCreateExpenseModal] = useState(false);
  const [showRecordPaymentModal, setShowRecordPaymentModal] = useState(null); // invoice obj
  const [showConvertToCreditNoteModal, setShowConvertToCreditNoteModal] = useState(null); // invoice obj
  const [showApplyCreditModal, setShowApplyCreditModal] = useState(null); // credit note obj
  const [showPaymentAuditModal, setShowPaymentAuditModal] = useState(null); // payment obj

  // Edit Modals
  const [editInvoiceModal, setEditInvoiceModal] = useState(null); // invoice obj
  const [editEstimateModal, setEditEstimateModal] = useState(null); // estimate obj
  const [editPaymentModal, setEditPaymentModal] = useState(null); // payment obj
  const [editCreditNoteModal, setEditCreditNoteModal] = useState(null); // credit note obj
  const [editPoModal, setEditPoModal] = useState(null); // PO obj
  const [editExpenseModal, setEditExpenseModal] = useState(null); // expense obj
  const [editBillModal, setEditBillModal] = useState(null); // bill obj

  // Create Form States
  const [newEstimate, setNewEstimate] = useState({ client: 'Stark Industries', project: 'Global Supply Chain Module', validUntil: '2026-08-30', desc: 'AI Telematics Integration', qty: 1, rate: 45000, tax: 10, terms: 'Valid for 30 days.' });
  const [newInvoice, setNewInvoice] = useState({ client: 'CyberDyne Systems', project: 'Cloud Scale Migration', dueDate: '2026-08-20', desc: 'Server Migration Milestone 2', qty: 1, rate: 35000, tax: 0, discount: 0, terms: 'Payment due in 15 days.' });
  const [newExpense, setNewExpense] = useState({ category: 'Software & Cloud', vendor: 'Amazon Web Services', amount: '2450.00', date: new Date().toISOString().split('T')[0], recurring: 'Monthly' });
  const [newPoForm, setNewPoForm] = useState({
    supplier: 'OptoTech Displays Ltd',
    type: 'Raw Material',
    orderDate: new Date().toISOString().split('T')[0],
    expectedDate: '2026-08-20',
    shippingAddress: 'Plant 1 Assembly Dock, Sector 4, Acme Facility',
    billingAddress: 'Acme HQ, Accounts Payable, Suite 400',
    notes: 'Standard manufacturing order with QA inspection on receipt.',
    terms: 'Net 30 days standard vendor terms.',
    status: 'Draft',
    items: [
      { desc: '15.6 Inch IPS Touch Display Panel', qty: 50, unitCost: 180, tax: 0 }
    ]
  });

  const [paymentForm, setPaymentForm] = useState({ amount: '', method: 'Bank Wire Transfer', txnId: 'TXN-773019284', date: '2026-08-04' });
  const [creditNoteForm, setCreditNoteForm] = useState({ amount: '', reason: 'Refund for Line Item Adjustment' });
  const [applyCreditForm, setApplyCreditForm] = useState({ targetInvoiceId: 'INV-2026-091', redeemAmount: '' });

  // Sub-Navigation Tabs matching exact specification
  const navTabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'estimates', label: 'Estimates', icon: FileText },
    { id: 'invoices', label: 'Invoices', icon: Receipt },
    { id: 'payments', label: 'Payments', icon: DollarSign },
    { id: 'creditnotes', label: 'Credit Notes', icon: CreditCard },
    { id: 'purchase_orders', label: 'Purchase Orders', icon: Truck },
    { id: 'purchase', label: 'Purchase Bills', icon: Layers },
    { id: 'expenses', label: 'Expenses', icon: CreditCard },
    { id: 'bank_recon', label: 'Bank Reconciliation', icon: Building2 },
    { id: 'reports', label: 'Reports', icon: AreaChart }
  ];

  // Helper for Status Badge Color Mapping
  const getBadgeVariant = (status) => {
    const s = (status || '').toLowerCase();
    if (s.includes('paid') || s.includes('accepted') || s.includes('completed') || s.includes('fully redeemed') || s.includes('reconciled') || s === 'received' || s === 'closed' || s === 'approved') return 'emerald';
    if (s.includes('sent') || s.includes('unused') || s.includes('active') || s === 'in progress') return 'indigo';
    if (s.includes('partially') || s.includes('pending') || s.includes('draft') || s.includes('expired')) return 'amber';
    if (s.includes('overdue') || s.includes('declined') || s.includes('unpaid') || s.includes('unmatched') || s.includes('cancelled') || s.includes('rejected')) return 'rose';
    return 'slate';
  };

  // Convert Estimate -> Invoice
  const handleConvertEstimateToInvoice = (est) => {
    const newInv = {
      id: `INV-2026-0${invoices.length + 94}`,
      client: est.client,
      project: est.project,
      date: new Date().toISOString().split('T')[0],
      dueDate: "2026-08-25",
      amount: est.amount,
      numericAmount: est.numericAmount,
      amountDue: est.amount,
      numericAmountDue: est.numericAmount,
      status: "Draft",
      estimateRef: est.id,
      items: est.items || [{ desc: "Converted from Estimate " + est.id, qty: 1, rate: est.numericAmount, tax: 0, amount: est.numericAmount }],
      auditTrail: [
        { step: `Converted from Estimate ${est.id}`, by: "Sarah Jenkins (Finance)", time: new Date().toLocaleString() }
      ]
    };
    setInvoices([newInv, ...invoices]);
    setEstimates(prev => prev.map(e => e.id === est.id ? { ...e, status: 'Accepted' } : e));
    if (activeDocView) setActiveDocView(null);
    addToast(`Converted Estimate ${est.id} to Invoice ${newInv.id}`, "success");
  };

  // Record Payment Handler
  const handleRecordPayment = (e) => {
    e.preventDefault();
    if (!showRecordPaymentModal) return;
    const inv = showRecordPaymentModal;
    const paidVal = Number(paymentForm.amount) || inv.numericAmountDue || inv.numericAmount;
    const newAmountDueVal = Math.max(0, inv.numericAmountDue - paidVal);
    const newStatus = newAmountDueVal === 0 ? "Paid" : "Partially Paid";

    // Update Invoice
    setInvoices(prev => prev.map(item => item.id === inv.id ? {
      ...item,
      amountDue: `$${newAmountDueVal.toLocaleString()}.00`,
      numericAmountDue: newAmountDueVal,
      status: newStatus,
      auditTrail: [
        ...(item.auditTrail || []),
        { step: `Payment of $${paidVal.toLocaleString()} Recorded`, by: "David Chen (Finance)", time: new Date().toLocaleString() }
      ]
    } : item));

    // Create Payment Log
    const newPay = {
      id: `PAY-${900 + payments.length + 1}`,
      client: inv.client,
      invoiceId: inv.id,
      date: paymentForm.date,
      method: paymentForm.method,
      txnId: paymentForm.txnId || `TXN-${Math.floor(100000000 + Math.random() * 900000000)}`,
      amount: `$${paidVal.toLocaleString()}.00`,
      numericAmount: paidVal,
      status: "Completed",
      auditTrail: [
        { step: "Invoice Issued", by: "System Billing", time: inv.date },
        { step: "Payment Recorded", by: "David Chen (Finance)", time: `${paymentForm.date} 10:00 AM` },
        { step: "Invoice Status Updated", by: "Automated Workflow", time: `${paymentForm.date} 10:01 AM` }
      ]
    };
    setPayments([newPay, ...payments]);
    setShowRecordPaymentModal(null);
    addToast(`Recorded payment of $${paidVal.toLocaleString()} for Invoice ${inv.id}`, "success");
  };

  // Convert Invoice -> Credit Note Handler
  const handleConvertToCreditNote = (e) => {
    e.preventDefault();
    if (!showConvertToCreditNoteModal) return;
    const inv = showConvertToCreditNoteModal;
    const credVal = Number(creditNoteForm.amount) || inv.numericAmount;

    const newCN = {
      id: `CN-2026-0${creditNotes.length + 1}`,
      client: inv.client,
      originalInvoice: inv.id,
      issueDate: new Date().toISOString().split('T')[0],
      creditAmount: `$${credVal.toLocaleString()}.00`,
      numericCreditAmount: credVal,
      remainingBalance: `$${credVal.toLocaleString()}.00`,
      numericRemainingBalance: credVal,
      status: "Unused",
      reason: creditNoteForm.reason || "Invoice Refund Adjustment",
      auditTrail: [
        { step: `Issued against ${inv.id}`, by: "Sarah Jenkins (Finance)", time: new Date().toLocaleString() }
      ]
    };

    setCreditNotes([newCN, ...creditNotes]);
    setShowConvertToCreditNoteModal(null);
    addToast(`Issued Credit Note ${newCN.id} ($${credVal.toLocaleString()}) for Invoice ${inv.id}`, "success");
  };

  // Apply Credit Note to Invoice
  const handleApplyCreditNote = (e) => {
    e.preventDefault();
    if (!showApplyCreditModal) return;
    const cn = showApplyCreditModal;
    const redeemVal = Number(applyCreditForm.redeemAmount) || cn.numericRemainingBalance;
    const targetInvId = applyCreditForm.targetInvoiceId;

    const newRemBalance = Math.max(0, cn.numericRemainingBalance - redeemVal);
    const newCnStatus = newRemBalance === 0 ? "Fully Redeemed" : "Partially Redeemed";

    // Update Credit Note
    setCreditNotes(prev => prev.map(c => c.id === cn.id ? {
      ...c,
      remainingBalance: `$${newRemBalance.toLocaleString()}.00`,
      numericRemainingBalance: newRemBalance,
      status: newCnStatus,
      auditTrail: [
        ...(c.auditTrail || []),
        { step: `Applied $${redeemVal.toLocaleString()} to ${targetInvId}`, by: "David Chen (Finance)", time: new Date().toLocaleString() }
      ]
    } : c));

    // Update Target Invoice Amount Due
    setInvoices(prev => prev.map(inv => {
      if (inv.id === targetInvId) {
        const updatedDue = Math.max(0, inv.numericAmountDue - redeemVal);
        return {
          ...inv,
          amountDue: `$${updatedDue.toLocaleString()}.00`,
          numericAmountDue: updatedDue,
          status: updatedDue === 0 ? "Paid" : "Partially Paid",
          auditTrail: [
            ...(inv.auditTrail || []),
            { step: `Credit Note ${cn.id} applied ($${redeemVal.toLocaleString()})`, by: "David Chen (Finance)", time: new Date().toLocaleString() }
          ]
        };
      }
      return inv;
    }));

    setShowApplyCreditModal(null);
    addToast(`Applied $${redeemVal.toLocaleString()} credit from ${cn.id} to Invoice ${targetInvId}`, "success");
  };

  // Create Estimate Form Submit
  const handleCreateEstimateSubmit = (e) => {
    e.preventDefault();
    const rateVal = Number(newEstimate.rate) || 1000;
    const totalVal = rateVal * (Number(newEstimate.qty) || 1);
    const item = {
      id: `EST-2026-0${estimates.length + 1}`,
      client: newEstimate.client,
      project: newEstimate.project,
      date: new Date().toISOString().split('T')[0],
      validUntil: newEstimate.validUntil,
      amount: `$${totalVal.toLocaleString()}.00`,
      numericAmount: totalVal,
      status: "Sent",
      terms: newEstimate.terms,
      items: [{ desc: newEstimate.desc, qty: Number(newEstimate.qty), rate: rateVal, tax: Number(newEstimate.tax), amount: totalVal }],
      auditTrail: [
        { step: "Estimate Created & Dispatched", by: "Sarah Jenkins (Finance)", time: new Date().toLocaleString() }
      ]
    };
    setEstimates([item, ...estimates]);
    setShowCreateEstimateModal(false);
    addToast(`Created and sent Estimate ${item.id} to ${item.client}`, "success");
  };

  // Create Invoice Form Submit
  const handleCreateInvoiceSubmit = (e) => {
    e.preventDefault();
    const rateVal = Number(newInvoice.rate) || 1000;
    const totalVal = rateVal * (Number(newInvoice.qty) || 1);
    const item = {
      id: `INV-2026-0${invoices.length + 94}`,
      client: newInvoice.client,
      project: newInvoice.project,
      date: new Date().toISOString().split('T')[0],
      dueDate: newInvoice.dueDate,
      amount: `$${totalVal.toLocaleString()}.00`,
      numericAmount: totalVal,
      amountDue: `$${totalVal.toLocaleString()}.00`,
      numericAmountDue: totalVal,
      status: "Sent",
      estimateRef: null,
      items: [{ desc: newInvoice.desc, qty: Number(newInvoice.qty), rate: rateVal, tax: Number(newInvoice.tax), amount: totalVal }],
      auditTrail: [
        { step: "Invoice Created & Issued", by: "Sarah Jenkins (Finance)", time: new Date().toLocaleString() }
      ]
    };
    setInvoices([item, ...invoices]);
    setShowCreateInvoiceModal(false);
    addToast(`Issued Invoice ${item.id} to ${item.client}`, "success");
  };

  // Create Expense Submit
  const handleCreateExpenseSubmit = (e) => {
    e.preventDefault();
    const numAmt = Number(newExpense.amount) || 100;
    const item = {
      id: `EXP-${900 + expenses.length + 1}`,
      category: newExpense.category,
      vendor: newExpense.vendor,
      amount: `$${numAmt.toLocaleString()}.00`,
      date: newExpense.date,
      status: "Approved",
      recurring: newExpense.recurring
    };
    setExpenses([item, ...expenses]);
    setShowCreateExpenseModal(false);
    addToast(`Recorded expense ${item.id} ($${numAmt.toLocaleString()})`, "success");
  };

  // PO Helper: Calculate line items total
  const calculatePoTotals = (items) => {
    const subtotal = (items || []).reduce((acc, curr) => acc + (Number(curr.qty || 0) * Number(curr.unitCost || 0)), 0);
    const taxTotal = (items || []).reduce((acc, curr) => acc + (Number(curr.qty || 0) * Number(curr.unitCost || 0) * (Number(curr.tax || 0) / 100)), 0);
    const grandTotal = subtotal + taxTotal;
    return { subtotal, taxTotal, grandTotal };
  };

  // Create Purchase Order Submit
  const handleCreatePoSubmit = (e) => {
    e.preventDefault();
    const { grandTotal } = calculatePoTotals(newPoForm.items);
    const prefix = newPoForm.type === 'Raw Material' ? 'PO-RM-2026' : 'PO-GEN-2026';
    const newPoId = `${prefix}-0${purchaseOrders.length + 1}`;

    const formattedItems = newPoForm.items.map(i => ({
      desc: i.desc,
      qty: Number(i.qty),
      unitCost: Number(i.unitCost),
      tax: Number(i.tax || 0),
      amount: Number(i.qty) * Number(i.unitCost)
    }));

    const primaryItem = formattedItems[0]?.desc || "General Supplies";

    const newPo = {
      id: newPoId,
      supplier: newPoForm.supplier,
      item: primaryItem,
      type: newPoForm.type,
      qty: formattedItems.reduce((acc, c) => acc + c.qty, 0),
      unitCost: `$${formattedItems[0]?.unitCost || 0}.00`,
      total: `$${grandTotal.toLocaleString()}.00`,
      numericTotal: grandTotal,
      status: newPoForm.status || "Draft",
      orderDate: newPoForm.orderDate,
      expectedDate: newPoForm.expectedDate,
      autoReorder: newPoForm.type === 'Raw Material',
      shippingAddress: newPoForm.shippingAddress,
      billingAddress: newPoForm.billingAddress,
      notes: newPoForm.notes,
      terms: newPoForm.terms,
      items: formattedItems,
      auditTrail: [
        { step: `PO Created (${newPoForm.status || 'Draft'})`, by: "Sarah Jenkins (Finance)", time: new Date().toLocaleString() }
      ]
    };

    addPurchaseOrder(newPo);
    setShowCreatePoModal(false);
    addToast(`Purchase Order ${newPo.id} created successfully!`, "success", "Purchase Order");
  };

  // Duplicate PO
  const handleDuplicatePo = (po) => {
    const newPoId = `${po.id.replace(/-0\d+$/, '')}-0${purchaseOrders.length + 1}`;
    const duplicated = {
      ...po,
      id: newPoId,
      status: "Draft",
      orderDate: new Date().toISOString().split('T')[0],
      convertedBillId: null,
      auditTrail: [
        { step: `Duplicated from ${po.id}`, by: "Sarah Jenkins (Finance)", time: new Date().toLocaleString() }
      ]
    };
    addPurchaseOrder(duplicated);
    addToast(`Duplicated ${po.id} as new Draft PO ${newPoId}`, "info");
  };

  // Send PO (Draft -> Sent)
  const handleSendPo = (po) => {
    updatePurchaseOrder(po.id, {
      status: "Sent",
      auditTrail: [
        ...(po.auditTrail || []),
        { step: "Dispatched to Supplier", by: "David Chen (Finance)", time: new Date().toLocaleString() }
      ]
    });
    addToast(`Purchase Order ${po.id} sent to ${po.supplier}`, "success");
  };

  // Convert Received PO to Purchase Invoice / Bill
  const handleConvertPoToBill = (po) => {
    const billId = convertPoToPurchaseBill(po);
  };

  // ==========================================
  // EDIT HANDLERS (SAVE IN-PLACE + AUDIT LOG)
  // ==========================================

  // Save Edit Invoice
  const handleSaveEditInvoice = (e) => {
    e.preventDefault();
    if (!editInvoiceModal) return;
    const inv = editInvoiceModal;
    const rateVal = Number(inv.rate) || Number(inv.numericAmount) || 1000;
    const qtyVal = Number(inv.qty) || 1;
    const totalVal = rateVal * qtyVal;

    const auditEntry = {
      step: "Invoice Record Edited",
      by: "Sarah Jenkins (Finance)",
      time: new Date().toLocaleString(),
      note: `Updated due date to ${inv.dueDate}, client: ${inv.client}`
    };

    setInvoices(prev => prev.map(item => item.id === inv.id ? {
      ...item,
      client: inv.client,
      project: inv.project,
      dueDate: inv.dueDate,
      status: inv.status,
      amount: `$${totalVal.toLocaleString()}.00`,
      numericAmount: totalVal,
      amountDue: inv.status === 'Paid' ? '$0.00' : `$${totalVal.toLocaleString()}.00`,
      numericAmountDue: inv.status === 'Paid' ? 0 : totalVal,
      terms: inv.terms,
      items: [{ desc: inv.desc || inv.items?.[0]?.desc || 'ERP Services', qty: qtyVal, rate: rateVal, tax: Number(inv.tax || 0), amount: totalVal }],
      auditTrail: [...(item.auditTrail || []), auditEntry]
    } : item));

    setEditInvoiceModal(null);
    addToast(`Invoice ${inv.id} updated successfully`, "success", "Record Updated");
  };

  // Save Edit Estimate
  const handleSaveEditEstimate = (e) => {
    e.preventDefault();
    if (!editEstimateModal) return;
    const est = editEstimateModal;
    const rateVal = Number(est.rate) || Number(est.numericAmount) || 1000;
    const qtyVal = Number(est.qty) || 1;
    const totalVal = rateVal * qtyVal;

    const auditEntry = {
      step: "Estimate Proposal Edited",
      by: "Sarah Jenkins (Finance)",
      time: new Date().toLocaleString()
    };

    setEstimates(prev => prev.map(item => item.id === est.id ? {
      ...item,
      client: est.client,
      project: est.project,
      validUntil: est.validUntil,
      status: est.status,
      amount: `$${totalVal.toLocaleString()}.00`,
      numericAmount: totalVal,
      terms: est.terms,
      items: [{ desc: est.desc || est.items?.[0]?.desc || 'ERP Proposal', qty: qtyVal, rate: rateVal, tax: Number(est.tax || 0), amount: totalVal }],
      auditTrail: [...(item.auditTrail || []), auditEntry]
    } : item));

    setEditEstimateModal(null);
    addToast(`Estimate ${est.id} updated successfully`, "success", "Record Updated");
  };

  // Save Edit Payment
  const handleSaveEditPayment = (e) => {
    e.preventDefault();
    if (!editPaymentModal) return;
    const pay = editPaymentModal;
    const numAmt = Number(pay.numericAmount) || Number(pay.amount?.toString().replace(/[^0-9.-]+/g,"")) || 1000;

    const auditEntry = {
      step: "Payment Transaction Details Modified",
      by: "David Chen (Finance)",
      time: new Date().toLocaleString()
    };

    setPayments(prev => prev.map(item => item.id === pay.id ? {
      ...item,
      client: pay.client,
      invoiceId: pay.invoiceId,
      method: pay.method,
      txnId: pay.txnId,
      date: pay.date,
      status: pay.status,
      amount: `$${numAmt.toLocaleString()}.00`,
      numericAmount: numAmt,
      auditTrail: [...(item.auditTrail || []), auditEntry]
    } : item));

    setEditPaymentModal(null);
    addToast(`Payment record ${pay.id} updated successfully`, "success", "Record Updated");
  };

  // Save Edit Credit Note
  const handleSaveEditCreditNote = (e) => {
    e.preventDefault();
    if (!editCreditNoteModal) return;
    const cn = editCreditNoteModal;
    const numAmt = Number(cn.numericCreditAmount) || 1000;
    const remAmt = Number(cn.numericRemainingBalance);

    const auditEntry = {
      step: "Credit Note Modified",
      by: "Sarah Jenkins (Finance)",
      time: new Date().toLocaleString()
    };

    setCreditNotes(prev => prev.map(item => item.id === cn.id ? {
      ...item,
      client: cn.client,
      originalInvoice: cn.originalInvoice,
      issueDate: cn.issueDate,
      reason: cn.reason,
      status: cn.status,
      creditAmount: `$${numAmt.toLocaleString()}.00`,
      numericCreditAmount: numAmt,
      remainingBalance: `$${remAmt.toLocaleString()}.00`,
      numericRemainingBalance: remAmt,
      auditTrail: [...(item.auditTrail || []), auditEntry]
    } : item));

    setEditCreditNoteModal(null);
    addToast(`Credit Note ${cn.id} updated successfully`, "success", "Record Updated");
  };

  // Save Edit Expense
  const handleSaveEditExpense = (e) => {
    e.preventDefault();
    if (!editExpenseModal) return;
    const exp = editExpenseModal;
    const numAmt = Number(exp.numericAmount) || Number(exp.amount?.toString().replace(/[^0-9.-]+/g,"")) || 100;

    setExpenses(prev => prev.map(item => item.id === exp.id ? {
      ...item,
      category: exp.category,
      vendor: exp.vendor,
      date: exp.date,
      status: exp.status,
      recurring: exp.recurring,
      amount: `$${numAmt.toLocaleString()}.00`
    } : item));

    setEditExpenseModal(null);
    addToast(`Expense ${exp.id} updated successfully`, "success", "Record Updated");
  };

  // Save Edit Purchase Bill
  const handleSaveEditBill = (e) => {
    e.preventDefault();
    if (!editBillModal) return;
    const bill = editBillModal;
    const numAmt = Number(bill.numericAmount) || Number(bill.amount?.toString().replace(/[^0-9.-]+/g,"")) || 500;

    setBills(prev => prev.map(item => item.id === bill.id ? {
      ...item,
      vendor: bill.vendor,
      billDate: bill.billDate,
      dueDate: bill.dueDate,
      status: bill.status,
      poRef: bill.poRef,
      amount: `$${numAmt.toLocaleString()}.00`
    } : item));

    setEditBillModal(null);
    addToast(`Purchase Bill ${bill.id} updated successfully`, "success", "Record Updated");
  };

  // Save Edit Purchase Order
  const handleSaveEditPo = (e) => {
    e.preventDefault();
    if (!editPoModal) return;
    const po = editPoModal;
    const { grandTotal } = calculatePoTotals(po.items || []);

    const auditEntry = {
      step: "PO Details Modified",
      by: "Sarah Jenkins (Finance)",
      time: new Date().toLocaleString()
    };

    const updatedPo = {
      ...po,
      supplier: po.supplier,
      type: po.type,
      orderDate: po.orderDate,
      expectedDate: po.expectedDate,
      status: po.status,
      shippingAddress: po.shippingAddress,
      billingAddress: po.billingAddress,
      notes: po.notes,
      terms: po.terms,
      total: `$${grandTotal.toLocaleString()}.00`,
      numericTotal: grandTotal,
      auditTrail: [...(po.auditTrail || []), auditEntry]
    };

    updatePurchaseOrder(po.id, updatedPo);
    setEditPoModal(null);
    addToast(`Purchase Order ${po.id} updated successfully`, "success", "Record Updated");
  };

  // Currency Formatter guaranteeing two decimal places ($0.00)
  const formatCurrency = (val) => {
    if (val === undefined || val === null || val === '') return '$0.00';
    if (typeof val === 'number') {
      return `$${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    const str = val.toString().trim();
    const num = Number(str.replace(/[^0-9.-]+/g, ''));
    if (isNaN(num)) return '$0.00';
    return `$${num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Reusable Action Button with Tooltip for Locked State
  const renderEditActionButton = (isLocked, lockedReason, onEditClick) => {
    if (isLocked) {
      return (
        <div className="relative group inline-flex items-center">
          <button
            type="button"
            disabled
            className="p-1.5 rounded-lg text-slate-300 dark:text-slate-700 cursor-not-allowed opacity-40 hover:bg-transparent"
            aria-label="Edit disabled"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <div className="absolute right-0 bottom-full mb-1.5 hidden group-hover:block z-50 px-2.5 py-1.5 text-[11px] font-medium text-white bg-slate-900 dark:bg-slate-800 rounded-lg shadow-xl whitespace-nowrap border border-slate-700 pointer-events-none max-w-xs text-left animate-in fade-in">
            {lockedReason}
          </div>
        </div>
      );
    }

    return (
      <button
        type="button"
        onClick={onEditClick}
        className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/80 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
        title="Edit Record"
      >
        <Pencil className="h-4 w-4" />
      </button>
    );
  };

  return (
    <div className="space-y-6 w-full max-w-full min-w-0">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-heading">
            Finance & Accounts Management
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            Estimates, Client Invoicing, Payments, Credit Notes, Purchase Orders (PO), Vendor Bills, and Bank Reconciliation.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setShowCreateInvoiceModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Create Invoice</span>
          </button>
          <button
            onClick={() => setShowCreatePoModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
          >
            <Truck className="h-4 w-4 text-emerald-400" />
            <span>Issue New PO</span>
          </button>
          <button
            onClick={() => setShowCreateEstimateModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <Plus className="h-4 w-4 text-indigo-500" />
            <span>New Estimate</span>
          </button>
        </div>
      </div>

      {/* Sub-Navigation Tabs Bar */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800 scrollbar-none">
        {navTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setSearchTerm('');
                setStatusFilter('All');
                setPoTypeFilter('All');
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80'
              }`}
            >
              <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} aria-hidden="true" />
              <span>{tab.label}</span>
              {tab.id === 'purchase_orders' && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${isActive ? 'bg-white/20 text-white' : 'bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300'}`}>
                  {purchaseOrders.length}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ========================================================= */}
      {/* 1. INVOICES SUB-SECTION */}
      {/* ========================================================= */}
      {activeTab === 'invoices' && (
        <div className="space-y-6">
          {/* KPI Summary Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Invoiced Value"
              value="$254,500.00"
              change="+18.4%"
              isPositive={true}
              period="vs last month"
              icon="DollarSign"
              color="indigo"
            />
            <StatCard
              title="Total Paid Receipts"
              value="$113,500.00"
              change="+24.2%"
              isPositive={true}
              period="collected"
              icon="CheckCircle"
              color="emerald"
            />
            <StatCard
              title="Overdue Receivables"
              value="$28,000.00"
              change="-5.1%"
              isPositive={false}
              period="1 invoice overdue"
              icon="AlertTriangle"
              color="rose"
            />
            <StatCard
              title="Outstanding Balance"
              value="$118,500.00"
              change="Active"
              isPositive={true}
              period="pending collection"
              icon="TrendingUp"
              color="amber"
            />
          </div>

          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
            <div className="relative flex-1 w-full max-w-md">
              <Search className="h-4 w-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search by invoice #, client name, or project..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="h-4 w-4 text-slate-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="Paid">Paid</option>
                <option value="Partially Paid">Partially Paid</option>
                <option value="Sent">Sent</option>
                <option value="Overdue">Overdue</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
          </div>

          {/* Invoices Table */}
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
              <table className="w-full text-left border-collapse min-w-[920px]">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/70 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    {/* Sticky Invoice # Header */}
                    <th className="sticky left-0 z-20 bg-slate-50 dark:bg-slate-950 pl-4 pr-3 py-3.5 whitespace-nowrap min-w-[135px] border-r border-slate-200/80 dark:border-slate-800 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.06)] dark:shadow-[2px_0_5px_-2px_rgba(0,0,0,0.4)]">
                      Invoice #
                    </th>
                    <th className="px-3 py-3.5 min-w-[160px]">Client Account</th>
                    <th className="px-3 py-3.5 min-w-[160px]">Project / Origin</th>
                    <th className="px-3 py-3.5 min-w-[100px] whitespace-nowrap">Issue Date</th>
                    <th className="px-3 py-3.5 min-w-[100px] whitespace-nowrap">Due Date</th>
                    <th className="px-3 py-3.5 min-w-[110px] whitespace-nowrap">Total Amount</th>
                    <th className="px-3 py-3.5 min-w-[110px] whitespace-nowrap">Amount Due</th>
                    <th className="px-3 py-3.5 min-w-[100px] whitespace-nowrap">Status</th>
                    <th className="pl-3 pr-4 py-3.5 text-right min-w-[180px] whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs font-medium">
                  {invoices
                    .filter(inv => {
                      const matchSearch = inv.id.toLowerCase().includes(searchTerm.toLowerCase()) || inv.client.toLowerCase().includes(searchTerm.toLowerCase()) || (inv.project && inv.project.toLowerCase().includes(searchTerm.toLowerCase()));
                      const matchStatus = statusFilter === 'All' || inv.status === statusFilter;
                      return matchSearch && matchStatus;
                    })
                    .map((inv) => {
                      const isPaid = inv.status === 'Paid';
                      return (
                        <tr key={inv.id} className="group hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                          {/* Sticky Invoice # Data Cell */}
                          <td className="sticky left-0 z-10 bg-white dark:bg-slate-900 group-hover:bg-slate-50 dark:group-hover:bg-slate-850 pl-4 pr-3 py-3.5 font-bold text-indigo-600 dark:text-indigo-400 whitespace-nowrap border-r border-slate-200/80 dark:border-slate-800 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.06)] dark:shadow-[2px_0_5px_-2px_rgba(0,0,0,0.4)] transition-colors">
                            {inv.id}
                          </td>
                          <td className="px-3 py-3.5 font-bold text-slate-900 dark:text-white min-w-[160px]">{inv.client}</td>
                          <td className="px-3 py-3.5 text-slate-600 dark:text-slate-400 min-w-[160px]">
                            <span className="block font-medium text-slate-800 dark:text-slate-200">{inv.project || 'General Billing'}</span>
                            {inv.estimateRef && <span className="block text-[10px] text-indigo-500 font-semibold mt-0.5">From {inv.estimateRef}</span>}
                          </td>
                          <td className="px-3 py-3.5 text-slate-600 dark:text-slate-400 whitespace-nowrap">{inv.date}</td>
                          <td className="px-3 py-3.5 text-slate-500 whitespace-nowrap">{inv.dueDate}</td>
                          <td className="px-3 py-3.5 font-bold text-slate-900 dark:text-white whitespace-nowrap">{formatCurrency(inv.numericAmount || inv.amount)}</td>
                          <td className="px-3 py-3.5 font-bold text-emerald-600 dark:text-emerald-400 whitespace-nowrap">{formatCurrency(inv.numericAmountDue !== undefined ? inv.numericAmountDue : inv.amountDue)}</td>
                          <td className="px-3 py-3.5 whitespace-nowrap"><Badge variant={getBadgeVariant(inv.status)}>{inv.status}</Badge></td>
                          <td className="pl-3 pr-4 py-3.5 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-1.5">
                              {/* View Action */}
                              <button
                                onClick={() => setActiveDocView({ type: 'invoice', data: inv })}
                                className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/80 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer transition-colors"
                                title="View Invoice"
                              >
                                <Eye className="h-4 w-4" />
                              </button>

                              {/* Edit Action with Locked Tooltip */}
                              {renderEditActionButton(
                                isPaid,
                                "Paid invoices can't be edited — issue a credit note instead",
                                () => setEditInvoiceModal({
                                  ...inv,
                                  desc: inv.items?.[0]?.desc || 'ERP Services',
                                  qty: inv.items?.[0]?.qty || 1,
                                  rate: inv.items?.[0]?.rate || inv.numericAmount,
                                  tax: inv.items?.[0]?.tax || 0
                                })
                              )}

                              {/* Record Payment */}
                              {!isPaid && (
                                <button
                                  onClick={() => {
                                    setShowRecordPaymentModal(inv);
                                    setPaymentForm({ ...paymentForm, amount: inv.numericAmountDue || inv.numericAmount });
                                  }}
                                  className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] cursor-pointer shadow-2xs transition-colors"
                                  title="Record Payment"
                                >
                                  Pay
                                </button>
                              )}

                              {/* Convert to Credit Note */}
                              <button
                                onClick={() => {
                                  setShowConvertToCreditNoteModal(inv);
                                  setCreditNoteForm({ ...creditNoteForm, amount: inv.numericAmount });
                                }}
                                className="px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-[11px] cursor-pointer transition-colors"
                                title="Issue Credit Note"
                              >
                                Credit Note
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. PURCHASE ORDERS SUB-SECTION (NEW CORE COMPONENT) */}
      {/* ========================================================= */}
      {activeTab === 'purchase_orders' && (
        <div className="space-y-6">
          {/* KPI Summary Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Purchase Orders"
              value={`${purchaseOrders.length} Orders`}
              change="Active"
              isPositive={true}
              period="Raw & General POs"
              icon="Truck"
              color="indigo"
            />
            <StatCard
              title="Pending Approval / In Transit"
              value={`${purchaseOrders.filter(p => p.status === 'Draft' || p.status === 'Sent' || p.status === 'Partially Received').length} POs`}
              change="Awaiting delivery"
              isPositive={true}
              period="open orders"
              icon="Clock"
              color="amber"
            />
            <StatCard
              title="Total PO Value"
              value={`$${purchaseOrders.reduce((acc, p) => acc + (p.numericTotal || 0), 0).toLocaleString()}.00`}
              change="+14.5%"
              isPositive={true}
              period="procurement commitments"
              icon="DollarSign"
              color="emerald"
            />
            <StatCard
              title="Overdue Deliveries"
              value={`${purchaseOrders.filter(p => p.status !== 'Received' && p.status !== 'Closed' && new Date(p.expectedDate) < new Date('2026-08-05')).length} Delayed`}
              change="Priority"
              isPositive={false}
              period="supplier follow-up needed"
              icon="AlertTriangle"
              color="rose"
            />
          </div>

          {/* Filter & Actions Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
            <div className="flex items-center gap-3 flex-1 w-full max-w-md">
              <div className="relative flex-1">
                <Search className="h-4 w-4 absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search PO #, supplier, or material..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
              {/* Type Filter */}
              <select
                value={poTypeFilter}
                onChange={(e) => setPoTypeFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                <option value="All">All PO Types</option>
                <option value="Raw Material">Raw Material (Manufacturing)</option>
                <option value="General Purchase">General Purchase</option>
              </select>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="Draft">Draft</option>
                <option value="Sent">Sent</option>
                <option value="Partially Received">Partially Received</option>
                <option value="Received">Received</option>
                <option value="Closed">Closed</option>
                <option value="Cancelled">Cancelled</option>
              </select>

              <button
                onClick={() => setShowCreatePoModal(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold cursor-pointer shadow-2xs"
              >
                <Plus className="h-4 w-4" /> New PO
              </button>
            </div>
          </div>

          {/* Unified Purchase Orders Table */}
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
              <table className="w-full text-left border-collapse min-w-[950px]">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/70 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="p-3.5 w-10 text-center">
                      <input
                        type="checkbox"
                        onChange={(e) => setSelectedPoIds(e.target.checked ? purchaseOrders.map(p => p.id) : [])}
                        checked={selectedPoIds.length === purchaseOrders.length && purchaseOrders.length > 0}
                        className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                      />
                    </th>
                    {/* Sticky PO # Header */}
                    <th className="sticky left-0 z-20 bg-slate-50 dark:bg-slate-950 pl-4 pr-3 py-3.5 whitespace-nowrap min-w-[135px] border-r border-slate-200/80 dark:border-slate-800 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.06)] dark:shadow-[2px_0_5px_-2px_rgba(0,0,0,0.4)]">
                      PO #
                    </th>
                    <th className="px-3 py-3.5 min-w-[170px]">Supplier / Vendor</th>
                    <th className="px-3 py-3.5 min-w-[120px] whitespace-nowrap">Type</th>
                    <th className="px-3 py-3.5 min-w-[100px] whitespace-nowrap">Order Date</th>
                    <th className="px-3 py-3.5 min-w-[110px] whitespace-nowrap">Expected Delivery</th>
                    <th className="px-3 py-3.5 min-w-[110px] whitespace-nowrap">Total Amount</th>
                    <th className="px-3 py-3.5 min-w-[110px] whitespace-nowrap">Status</th>
                    <th className="pl-3 pr-4 py-3.5 text-right min-w-[190px] whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs font-medium">
                  {purchaseOrders
                    .filter(po => {
                      const matchSearch = po.id.toLowerCase().includes(searchTerm.toLowerCase()) || po.supplier.toLowerCase().includes(searchTerm.toLowerCase()) || (po.item && po.item.toLowerCase().includes(searchTerm.toLowerCase()));
                      const matchStatus = statusFilter === 'All' || po.status === statusFilter;
                      const matchType = poTypeFilter === 'All' || po.type === poTypeFilter;
                      return matchSearch && matchStatus && matchType;
                    })
                    .map((po) => {
                      const isLocked = po.status === 'Received' || po.status === 'Closed';
                      const canConvertToBill = (po.status === 'Received' || po.status === 'Partially Received') && !po.convertedBillId;

                      return (
                        <tr key={po.id} className="group hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                          <td className="p-3.5 text-center">
                            <input
                              type="checkbox"
                              checked={selectedPoIds.includes(po.id)}
                              onChange={() => setSelectedPoIds(prev => prev.includes(po.id) ? prev.filter(i => i !== po.id) : [...prev, po.id])}
                              className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                            />
                          </td>
                          {/* Sticky PO # Cell */}
                          <td className="sticky left-0 z-10 bg-white dark:bg-slate-900 group-hover:bg-slate-50 dark:group-hover:bg-slate-850 pl-4 pr-3 py-3.5 font-bold text-indigo-600 dark:text-indigo-400 whitespace-nowrap border-r border-slate-200/80 dark:border-slate-800 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.06)] dark:shadow-[2px_0_5px_-2px_rgba(0,0,0,0.4)] transition-colors">
                            {po.id}
                            {po.convertedBillId && (
                              <span className="block text-[10px] text-emerald-600 font-medium mt-0.5">
                                Bill: {po.convertedBillId}
                              </span>
                            )}
                          </td>
                          <td className="px-3 py-3.5 font-bold text-slate-900 dark:text-white min-w-[170px]">
                            {po.supplier}
                            <span className="block text-[11px] font-normal text-slate-500 mt-0.5">{po.item}</span>
                          </td>
                          <td className="px-3 py-3.5 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold ${
                              po.type === 'Raw Material'
                                ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/70 dark:text-indigo-300 border border-indigo-200/50'
                                : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200'
                            }`}>
                              {po.type || 'Raw Material'}
                            </span>
                          </td>
                          <td className="px-3 py-3.5 text-slate-600 dark:text-slate-400 whitespace-nowrap">{po.orderDate || '2026-08-01'}</td>
                          <td className="px-3 py-3.5 text-slate-500 font-medium whitespace-nowrap">{po.expectedDate}</td>
                          <td className="px-3 py-3.5 font-bold text-slate-900 dark:text-white whitespace-nowrap">{formatCurrency(po.numericTotal || po.total)}</td>
                          <td className="px-3 py-3.5 whitespace-nowrap">
                            <Badge variant={getBadgeVariant(po.status)}>{po.status}</Badge>
                          </td>
                          <td className="pl-3 pr-4 py-3.5 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-1.5">
                              {/* View Action */}
                              <button
                                onClick={() => setActiveDocView({ type: 'po', data: po })}
                                className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 text-slate-600 dark:text-slate-300 hover:text-indigo-600 cursor-pointer"
                                title="View Purchase Order Details"
                              >
                                <Eye className="h-4 w-4" />
                              </button>

                              {/* Edit Action with Locked Tooltip */}
                              {renderEditActionButton(
                                isLocked,
                                "Received/Closed POs cannot be edited — issue a purchase return or adjustment instead",
                                () => setEditPoModal({
                                  ...po,
                                  items: po.items || [{ desc: po.item, qty: po.qty || 1, unitCost: Number(po.unitCost?.toString().replace(/[^0-9.-]+/g,"")) || 100, tax: 0 }]
                                })
                              )}

                              {/* Send PO (Draft) */}
                              {po.status === 'Draft' && (
                                <button
                                  onClick={() => handleSendPo(po)}
                                  className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950 hover:bg-indigo-100 text-indigo-600 dark:text-indigo-400 cursor-pointer"
                                  title="Send PO to Vendor"
                                >
                                  <Send className="h-4 w-4" />
                                </button>
                              )}

                              {/* Convert to Purchase Invoice */}
                              {canConvertToBill && (
                                <button
                                  onClick={() => handleConvertPoToBill(po)}
                                  className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] cursor-pointer inline-flex items-center gap-1"
                                  title="Convert Received PO to Purchase Bill"
                                >
                                  <CornerDownRight className="h-3 w-3" /> Bill
                                </button>
                              )}

                              {/* Duplicate Action */}
                              <button
                                onClick={() => handleDuplicatePo(po)}
                                className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 cursor-pointer"
                                title="Duplicate PO"
                              >
                                <Copy className="h-3.5 w-3.5" />
                              </button>

                              {/* Delete Action */}
                              <button
                                onClick={() => {
                                  deletePurchaseOrder(po.id);
                                  addToast(`Deleted PO ${po.id}`, "info");
                                }}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 cursor-pointer"
                                title="Delete PO"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 3. ESTIMATES SUB-SECTION */}
      {/* ========================================================= */}
      {activeTab === 'estimates' && (
        <div className="space-y-6">
          {/* KPI Summary Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Estimates Created"
              value="12 Proposals"
              change="Active"
              isPositive={true}
              period="this quarter"
              icon="FileText"
              color="indigo"
            />
            <StatCard
              title="Accepted Proposals Value"
              value="$115,000.00"
              change="+31.2%"
              isPositive={true}
              period="won proposals"
              icon="CheckCircle"
              color="emerald"
            />
            <StatCard
              title="Pending Sent Proposals"
              value="$48,500.00"
              change="1 proposal"
              isPositive={true}
              period="awaiting client review"
              icon="Clock"
              color="amber"
            />
            <StatCard
              title="Proposal Conversion Rate"
              value="78.5%"
              change="+4.2%"
              isPositive={true}
              period="accepted vs sent"
              icon="TrendingUp"
              color="sky"
            />
          </div>

          {/* Estimates Table */}
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
              <table className="w-full text-left border-collapse min-w-[850px]">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/70 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    {/* Sticky Estimate # Header */}
                    <th className="sticky left-0 z-20 bg-slate-50 dark:bg-slate-950 pl-4 pr-3 py-3.5 whitespace-nowrap min-w-[135px] border-r border-slate-200/80 dark:border-slate-800 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.06)] dark:shadow-[2px_0_5px_-2px_rgba(0,0,0,0.4)]">
                      Estimate #
                    </th>
                    <th className="px-3 py-3.5 min-w-[160px]">Client Account</th>
                    <th className="px-3 py-3.5 min-w-[160px]">Project Title</th>
                    <th className="px-3 py-3.5 min-w-[100px] whitespace-nowrap">Created Date</th>
                    <th className="px-3 py-3.5 min-w-[100px] whitespace-nowrap">Valid Until</th>
                    <th className="px-3 py-3.5 min-w-[110px] whitespace-nowrap">Total Amount</th>
                    <th className="px-3 py-3.5 min-w-[100px] whitespace-nowrap">Status</th>
                    <th className="pl-3 pr-4 py-3.5 text-right min-w-[170px] whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs font-medium">
                  {estimates.map((est) => (
                    <tr key={est.id} className="group hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                      {/* Sticky Estimate # Cell */}
                      <td className="sticky left-0 z-10 bg-white dark:bg-slate-900 group-hover:bg-slate-50 dark:group-hover:bg-slate-850 pl-4 pr-3 py-3.5 font-bold text-indigo-600 dark:text-indigo-400 whitespace-nowrap border-r border-slate-200/80 dark:border-slate-800 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.06)] dark:shadow-[2px_0_5px_-2px_rgba(0,0,0,0.4)] transition-colors">
                        {est.id}
                      </td>
                      <td className="px-3 py-3.5 font-bold text-slate-900 dark:text-white min-w-[160px]">{est.client}</td>
                      <td className="px-3 py-3.5 text-slate-600 dark:text-slate-400 min-w-[160px]">{est.project}</td>
                      <td className="px-3 py-3.5 text-slate-600 dark:text-slate-400 whitespace-nowrap">{est.date}</td>
                      <td className="px-3 py-3.5 text-slate-500 whitespace-nowrap">{est.validUntil}</td>
                      <td className="px-3 py-3.5 font-bold text-slate-900 dark:text-white whitespace-nowrap">{formatCurrency(est.numericAmount || est.amount)}</td>
                      <td className="px-3 py-3.5 whitespace-nowrap"><Badge variant={getBadgeVariant(est.status)}>{est.status}</Badge></td>
                      <td className="pl-3 pr-4 py-3.5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* View */}
                          <button
                            onClick={() => setActiveDocView({ type: 'estimate', data: est })}
                            className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 text-slate-600 dark:text-slate-300 hover:text-indigo-600 cursor-pointer"
                            title="View Proposal"
                          >
                            <Eye className="h-4 w-4" />
                          </button>

                          {/* Edit Action */}
                          {renderEditActionButton(
                            false,
                            "",
                            () => setEditEstimateModal({
                              ...est,
                              desc: est.items?.[0]?.desc || 'Services',
                              qty: est.items?.[0]?.qty || 1,
                              rate: est.items?.[0]?.rate || est.numericAmount,
                              tax: est.items?.[0]?.tax || 0
                            })
                          )}

                          {/* Convert to Invoice */}
                          <button
                            onClick={() => handleConvertEstimateToInvoice(est)}
                            className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[11px] cursor-pointer inline-flex items-center gap-1"
                            title="Convert to Invoice"
                          >
                            <CornerDownRight className="h-3 w-3" /> Convert
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 4. PAYMENTS SUB-SECTION */}
      {/* ========================================================= */}
      {activeTab === 'payments' && (
        <div className="space-y-6">
          {/* KPI Summary Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Received Payments"
              value="$154,500.00"
              change="+22.8%"
              isPositive={true}
              period="settled"
              icon="CheckCircle"
              color="emerald"
            />
            <StatCard
              title="Bank Transfer Share"
              value="68.5%"
              change="Direct Wire"
              isPositive={true}
              period="primary channel"
              icon="Building2"
              color="indigo"
            />
            <StatCard
              title="Card & Gateway Payments"
              value="$22,500.00"
              change="+14.2%"
              isPositive={true}
              period="Stripe auto-settled"
              icon="CreditCard"
              color="sky"
            />
            <StatCard
              title="Pending Settlement"
              value="$12,750.00"
              change="1 deposit"
              isPositive={false}
              period="clearing today"
              icon="Clock"
              color="amber"
            />
          </div>

          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
            <div className="flex items-center gap-3 flex-1 w-full max-w-md">
              <div className="relative flex-1">
                <Search className="h-4 w-4 absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search payment ID, client, or txn #..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={methodFilter}
                onChange={(e) => setMethodFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                <option value="All">All Payment Methods</option>
                <option value="Bank Wire Transfer">Bank Wire Transfer</option>
                <option value="Credit Card (Stripe)">Credit Card</option>
                <option value="ACH Electronic Check">ACH Check</option>
                <option value="Direct Deposit">Direct Deposit</option>
              </select>

              <button
                onClick={() => addToast(`Exported ${payments.length} payment records to CSV`, "info")}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 cursor-pointer"
              >
                <Download className="h-4 w-4" /> Export CSV
              </button>
            </div>
          </div>

          {/* Payments Table */}
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
              <table className="w-full text-left border-collapse min-w-[920px]">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/70 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="p-3.5 w-10 text-center">
                      <input
                        type="checkbox"
                        onChange={(e) => setSelectedPaymentIds(e.target.checked ? payments.map(p => p.id) : [])}
                        checked={selectedPaymentIds.length === payments.length && payments.length > 0}
                        className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                      />
                    </th>
                    {/* Sticky Payment ID Header */}
                    <th className="sticky left-0 z-20 bg-slate-50 dark:bg-slate-950 pl-4 pr-3 py-3.5 whitespace-nowrap min-w-[135px] border-r border-slate-200/80 dark:border-slate-800 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.06)] dark:shadow-[2px_0_5px_-2px_rgba(0,0,0,0.4)]">
                      Payment ID
                    </th>
                    <th className="px-3 py-3.5 min-w-[160px]">Client Account</th>
                    <th className="px-3 py-3.5 min-w-[130px] whitespace-nowrap">Invoice Ref</th>
                    <th className="px-3 py-3.5 min-w-[150px]">Payment Method</th>
                    <th className="px-3 py-3.5 min-w-[130px] whitespace-nowrap">Txn / Ref ID</th>
                    <th className="px-3 py-3.5 min-w-[100px] whitespace-nowrap">Date</th>
                    <th className="px-3 py-3.5 min-w-[110px] whitespace-nowrap">Amount Paid</th>
                    <th className="px-3 py-3.5 min-w-[100px] whitespace-nowrap">Status</th>
                    <th className="pl-3 pr-4 py-3.5 text-right min-w-[150px] whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs font-medium">
                  {payments
                    .filter(p => {
                      const matchSearch = p.id.toLowerCase().includes(searchTerm.toLowerCase()) || p.client.toLowerCase().includes(searchTerm.toLowerCase()) || p.txnId.toLowerCase().includes(searchTerm.toLowerCase());
                      const matchMethod = methodFilter === 'All' || p.method === methodFilter;
                      return matchSearch && matchMethod;
                    })
                    .map((p) => {
                      const isSettled = p.status === 'Completed';
                      return (
                        <tr key={p.id} className="group hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                          <td className="p-3.5 text-center">
                            <input
                              type="checkbox"
                              checked={selectedPaymentIds.includes(p.id)}
                              onChange={() => setSelectedPaymentIds(prev => prev.includes(p.id) ? prev.filter(i => i !== p.id) : [...prev, p.id])}
                              className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                            />
                          </td>
                          {/* Sticky Payment ID Cell */}
                          <td className="sticky left-0 z-10 bg-white dark:bg-slate-900 group-hover:bg-slate-50 dark:group-hover:bg-slate-850 pl-4 pr-3 py-3.5 font-bold text-indigo-600 dark:text-indigo-400 whitespace-nowrap border-r border-slate-200/80 dark:border-slate-800 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.06)] dark:shadow-[2px_0_5px_-2px_rgba(0,0,0,0.4)] transition-colors">
                            {p.id}
                          </td>
                          <td className="px-3 py-3.5 font-bold text-slate-900 dark:text-white min-w-[160px]">{p.client}</td>
                          <td className="px-3 py-3.5 font-bold text-indigo-600 dark:text-indigo-400 whitespace-nowrap">{p.invoiceId}</td>
                          <td className="px-3 py-3.5 text-slate-700 dark:text-slate-300">{p.method}</td>
                          <td className="px-3 py-3.5 text-slate-500 font-mono text-[11px] whitespace-nowrap">{p.txnId}</td>
                          <td className="px-3 py-3.5 text-slate-600 dark:text-slate-400 whitespace-nowrap">{p.date}</td>
                          <td className="px-3 py-3.5 font-bold text-emerald-600 dark:text-emerald-400 whitespace-nowrap">{formatCurrency(p.numericAmount || p.amount)}</td>
                          <td className="px-3 py-3.5 whitespace-nowrap"><Badge variant={getBadgeVariant(p.status)}>{p.status}</Badge></td>
                          <td className="pl-3 pr-4 py-3.5 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-1.5">
                              {/* Edit Action with Locked Tooltip */}
                              {renderEditActionButton(
                                isSettled,
                                "Settled/reconciled payments are locked for audit integrity",
                                () => setEditPaymentModal({ ...p })
                              )}

                              {/* View Audit */}
                              <button
                                onClick={() => setShowPaymentAuditModal(p)}
                                className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 text-xs font-bold hover:bg-indigo-100 transition-colors cursor-pointer inline-flex items-center gap-1"
                              >
                                <ShieldCheck className="h-3.5 w-3.5" /> Audit
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 5. CREDIT NOTES SUB-SECTION */}
      {/* ========================================================= */}
      {activeTab === 'creditnotes' && (
        <div className="space-y-6">
          {/* KPI Summary Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Credit Notes Issued"
              value="$18,500.00"
              change="3 Notes"
              isPositive={true}
              period="total credits"
              icon="CreditCard"
              color="indigo"
            />
            <StatCard
              title="Available Unused Credit"
              value="$5,000.00"
              change="Ready"
              isPositive={true}
              period="to apply to future invoices"
              icon="CheckCircle"
              color="sky"
            />
            <StatCard
              title="Redeemed Credit"
              value="$13,500.00"
              change="Applied"
              isPositive={true}
              period="against client balances"
              icon="TrendingUp"
              color="emerald"
            />
            <StatCard
              title="Active Credit Count"
              value="3 Notes"
              change="Sync"
              isPositive={true}
              period="client accounts"
              icon="FileText"
              color="amber"
            />
          </div>

          {/* Credit Notes Table */}
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
              <table className="w-full text-left border-collapse min-w-[850px]">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/70 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    {/* Sticky Credit Note # Header */}
                    <th className="sticky left-0 z-20 bg-slate-50 dark:bg-slate-950 pl-4 pr-3 py-3.5 whitespace-nowrap min-w-[135px] border-r border-slate-200/80 dark:border-slate-800 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.06)] dark:shadow-[2px_0_5px_-2px_rgba(0,0,0,0.4)]">
                      Credit Note #
                    </th>
                    <th className="px-3 py-3.5 min-w-[160px]">Client Account</th>
                    <th className="px-3 py-3.5 min-w-[130px] whitespace-nowrap">Original Invoice</th>
                    <th className="px-3 py-3.5 min-w-[100px] whitespace-nowrap">Issue Date</th>
                    <th className="px-3 py-3.5 min-w-[110px] whitespace-nowrap">Credit Amount</th>
                    <th className="px-3 py-3.5 min-w-[110px] whitespace-nowrap">Remaining Balance</th>
                    <th className="px-3 py-3.5 min-w-[100px] whitespace-nowrap">Status</th>
                    <th className="pl-3 pr-4 py-3.5 text-right min-w-[160px] whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs font-medium">
                  {creditNotes.map((cn) => {
                    const isFullyRedeemed = cn.status === 'Fully Redeemed' || cn.numericRemainingBalance === 0;

                    return (
                      <tr key={cn.id} className="group hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                        {/* Sticky Credit Note # Cell */}
                        <td className="sticky left-0 z-10 bg-white dark:bg-slate-900 group-hover:bg-slate-50 dark:group-hover:bg-slate-850 pl-4 pr-3 py-3.5 font-bold text-indigo-600 dark:text-indigo-400 whitespace-nowrap border-r border-slate-200/80 dark:border-slate-800 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.06)] dark:shadow-[2px_0_5px_-2px_rgba(0,0,0,0.4)] transition-colors">
                          {cn.id}
                        </td>
                        <td className="px-3 py-3.5 font-bold text-slate-900 dark:text-white min-w-[160px]">{cn.client}</td>
                        <td className="px-3 py-3.5 font-bold text-indigo-600 dark:text-indigo-400 whitespace-nowrap">{cn.originalInvoice}</td>
                        <td className="px-3 py-3.5 text-slate-600 dark:text-slate-400 whitespace-nowrap">{cn.issueDate}</td>
                        <td className="px-3 py-3.5 font-bold text-slate-900 dark:text-white whitespace-nowrap">{formatCurrency(cn.numericCreditAmount || cn.creditAmount)}</td>
                        <td className="px-3 py-3.5 font-bold text-emerald-600 dark:text-emerald-400 whitespace-nowrap">{formatCurrency(cn.numericRemainingBalance !== undefined ? cn.numericRemainingBalance : cn.remainingBalance)}</td>
                        <td className="px-3 py-3.5 whitespace-nowrap"><Badge variant={getBadgeVariant(cn.status)}>{cn.status}</Badge></td>
                        <td className="pl-3 pr-4 py-3.5 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            {/* View */}
                            <button
                              onClick={() => setActiveDocView({ type: 'creditnote', data: cn })}
                              className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 text-slate-600 dark:text-slate-300 hover:text-indigo-600 cursor-pointer"
                              title="View Credit Note"
                            >
                              <Eye className="h-4 w-4" />
                            </button>

                            {/* Edit Action with Locked Tooltip */}
                            {renderEditActionButton(
                              isFullyRedeemed,
                              "Fully redeemed credit notes cannot be edited",
                              () => setEditCreditNoteModal({ ...cn })
                            )}

                            {/* Apply to Invoice */}
                            {cn.numericRemainingBalance > 0 ? (
                              <button
                                onClick={() => {
                                  setShowApplyCreditModal(cn);
                                  setApplyCreditForm({ targetInvoiceId: 'INV-2026-091', redeemAmount: cn.numericRemainingBalance });
                                }}
                                className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[11px] cursor-pointer"
                              >
                                Apply
                              </button>
                            ) : (
                              <span className="text-[11px] text-slate-400 italic">Redeemed</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 6. PURCHASE BILLS SUB-SECTION */}
      {/* ========================================================= */}
      {activeTab === 'purchase' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white font-heading">Purchase Bills (Vendor Invoices)</h2>
              <p className="text-xs text-slate-600 dark:text-slate-400">Track and pay vendor bills generated from accepted Purchase Orders and raw material deliveries.</p>
            </div>
            <button
              onClick={() => setActiveTab('purchase_orders')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 dark:bg-slate-800 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
            >
              <Truck className="h-4 w-4 text-emerald-400" />
              <span>Go to Purchase Orders</span>
            </button>
          </div>

          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
              <table className="w-full text-left border-collapse min-w-[850px]">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/70 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    {/* Sticky Bill No Header */}
                    <th className="sticky left-0 z-20 bg-slate-50 dark:bg-slate-950 pl-4 pr-3 py-3.5 whitespace-nowrap min-w-[135px] border-r border-slate-200/80 dark:border-slate-800 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.06)] dark:shadow-[2px_0_5px_-2px_rgba(0,0,0,0.4)]">
                      Bill No
                    </th>
                    <th className="px-3 py-3.5 min-w-[160px]">Vendor Name</th>
                    <th className="px-3 py-3.5 min-w-[100px] whitespace-nowrap">Bill Date</th>
                    <th className="px-3 py-3.5 min-w-[100px] whitespace-nowrap">Due Date</th>
                    <th className="px-3 py-3.5 min-w-[110px] whitespace-nowrap">Amount</th>
                    <th className="px-3 py-3.5 min-w-[110px] whitespace-nowrap">PO Ref</th>
                    <th className="px-3 py-3.5 min-w-[100px] whitespace-nowrap">Status</th>
                    <th className="pl-3 pr-4 py-3.5 text-right min-w-[160px] whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs font-medium">
                  {bills.map((b) => {
                    const isPaid = b.status === 'Paid';

                    return (
                      <tr key={b.id} className="group hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                        {/* Sticky Bill No Cell */}
                        <td className="sticky left-0 z-10 bg-white dark:bg-slate-900 group-hover:bg-slate-50 dark:group-hover:bg-slate-850 pl-4 pr-3 py-3.5 font-bold text-indigo-600 dark:text-indigo-400 whitespace-nowrap border-r border-slate-200/80 dark:border-slate-800 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.06)] dark:shadow-[2px_0_5px_-2px_rgba(0,0,0,0.4)] transition-colors">
                          {b.id}
                        </td>
                        <td className="px-3 py-3.5 font-bold text-slate-900 dark:text-white min-w-[160px]">{b.vendor}</td>
                        <td className="px-3 py-3.5 text-slate-600 dark:text-slate-400 whitespace-nowrap">{b.billDate}</td>
                        <td className="px-3 py-3.5 text-slate-500 whitespace-nowrap">{b.dueDate}</td>
                        <td className="px-3 py-3.5 font-bold text-slate-900 dark:text-white whitespace-nowrap">{formatCurrency(b.numericAmount || b.amount)}</td>
                        <td className="px-3 py-3.5 font-semibold text-indigo-600 dark:text-indigo-400 whitespace-nowrap">{b.poRef || 'Direct'}</td>
                        <td className="px-3 py-3.5 whitespace-nowrap"><Badge variant={getBadgeVariant(b.status)}>{b.status}</Badge></td>
                        <td className="pl-3 pr-4 py-3.5 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            {/* Edit Action */}
                            {renderEditActionButton(
                              isPaid,
                              "Paid bills cannot be edited — record an adjustment instead",
                              () => setEditBillModal({ ...b })
                            )}

                            {!isPaid && (
                              <button
                                onClick={() => {
                                  setBills(prev => prev.map(item => item.id === b.id ? { ...item, status: 'Paid' } : item));
                                  addToast(`Marked Bill ${b.id} as Paid`, "success");
                                }}
                                className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] cursor-pointer shadow-2xs transition-colors"
                              >
                                Mark Paid
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 7. EXPENSES SUB-SECTION */}
      {/* ========================================================= */}
      {activeTab === 'expenses' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white font-heading">Operating Expenses & Recurring Bills</h2>
              <p className="text-xs text-slate-600 dark:text-slate-400">Track and categorize administrative, utility, freight, and SaaS expenses.</p>
            </div>
            <button
              onClick={() => setShowCreateExpenseModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-2xs cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>Record Expense</span>
            </button>
          </div>

          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
              <table className="w-full text-left border-collapse min-w-[850px]">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/70 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    {/* Sticky Exp ID Header */}
                    <th className="sticky left-0 z-20 bg-slate-50 dark:bg-slate-950 pl-4 pr-3 py-3.5 whitespace-nowrap min-w-[135px] border-r border-slate-200/80 dark:border-slate-800 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.06)] dark:shadow-[2px_0_5px_-2px_rgba(0,0,0,0.4)]">
                      Exp ID
                    </th>
                    <th className="px-3 py-3.5 min-w-[150px]">Category</th>
                    <th className="px-3 py-3.5 min-w-[160px]">Vendor</th>
                    <th className="px-3 py-3.5 min-w-[110px] whitespace-nowrap">Amount</th>
                    <th className="px-3 py-3.5 min-w-[100px] whitespace-nowrap">Date</th>
                    <th className="px-3 py-3.5 min-w-[120px] whitespace-nowrap">Recurring</th>
                    <th className="pl-3 pr-4 py-3.5 text-right min-w-[130px] whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs font-medium">
                  {expenses.map((e) => (
                    <tr key={e.id} className="group hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                      {/* Sticky Exp ID Cell */}
                      <td className="sticky left-0 z-10 bg-white dark:bg-slate-900 group-hover:bg-slate-50 dark:group-hover:bg-slate-850 pl-4 pr-3 py-3.5 font-bold text-indigo-600 dark:text-indigo-400 whitespace-nowrap border-r border-slate-200/80 dark:border-slate-800 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.06)] dark:shadow-[2px_0_5px_-2px_rgba(0,0,0,0.4)] transition-colors">
                        {e.id}
                      </td>
                      <td className="px-3 py-3.5 font-bold text-slate-900 dark:text-white min-w-[150px]">{e.category}</td>
                      <td className="px-3 py-3.5 text-slate-700 dark:text-slate-300 min-w-[160px]">{e.vendor}</td>
                      <td className="px-3 py-3.5 font-bold text-slate-900 dark:text-white whitespace-nowrap">{formatCurrency(e.numericAmount || e.amount)}</td>
                      <td className="px-3 py-3.5 text-slate-500 whitespace-nowrap">{e.date}</td>
                      <td className="px-3 py-3.5 text-slate-600 dark:text-slate-400 font-semibold whitespace-nowrap">{e.recurring}</td>
                      <td className="pl-3 pr-4 py-3.5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Edit Action */}
                        {renderEditActionButton(
                          false,
                          "",
                          () => setEditExpenseModal({ ...e })
                        )}
                        <button
                          onClick={() => {
                            setExpenses(prev => prev.filter(item => item.id !== e.id));
                            addToast(`Deleted expense ${e.id}`, "info");
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 8. BANK RECONCILIATION */}
      {/* ========================================================= */}
      {activeTab === 'bank_recon' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white font-heading">Bank Accounts & Statement Reconciliation</h2>
              <p className="text-xs text-slate-600 dark:text-slate-400">Match bank statement lines with registered invoices, receipts, and vendor payouts.</p>
            </div>
            <button
              onClick={() => addToast("Reconciled 3 statement lines automatically", "success")}
              className="flex items-center gap-1.5 rounded-xl bg-indigo-600 text-white px-3.5 py-2 text-xs font-semibold shadow-2xs cursor-pointer hover:bg-indigo-700"
            >
              <RefreshCw className="h-4 w-4" /> Auto-Reconcile
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {BANK_ACCOUNTS.map((b) => (
              <div key={b.id} className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2 shadow-xs">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">{b.bankName}</span>
                  <span className="text-slate-500 font-mono">{b.accountNo}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">{b.name}</h3>
                <p className="text-2xl font-extrabold text-slate-900 dark:text-white">{b.balance}</p>
                <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100 dark:border-slate-800">
                  <span>Type: {b.type}</span>
                  <span className="text-emerald-600 font-semibold flex items-center gap-1"><CheckCircle className="h-3.5 w-3.5" /> Live Sync Active</span>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white font-heading">Recent Bank Feed Transactions</h3>
            </div>
            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
              <table className="w-full text-left border-collapse text-xs font-medium min-w-[750px]">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/70 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="sticky left-0 z-20 bg-slate-50 dark:bg-slate-950 pl-4 pr-3 py-3 whitespace-nowrap min-w-[110px] border-r border-slate-200/80 dark:border-slate-800 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.06)] dark:shadow-[2px_0_5px_-2px_rgba(0,0,0,0.4)]">
                      Feed ID
                    </th>
                    <th className="px-3 py-3 min-w-[95px] whitespace-nowrap">Date</th>
                    <th className="px-3 py-3 min-w-[180px]">Description</th>
                    <th className="px-3 py-3 min-w-[160px]">Bank Account</th>
                    <th className="px-3 py-3 min-w-[110px] whitespace-nowrap">Amount</th>
                    <th className="px-3 py-3 min-w-[100px] whitespace-nowrap">Status</th>
                    <th className="pl-3 pr-4 py-3 min-w-[120px] whitespace-nowrap font-mono text-[11px]">Matched Entity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {bankReconciles.map((rec) => (
                    <tr key={rec.id} className="group hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="sticky left-0 z-10 bg-white dark:bg-slate-900 group-hover:bg-slate-50 dark:group-hover:bg-slate-850 pl-4 pr-3 py-3 font-mono font-bold text-slate-700 dark:text-slate-300 whitespace-nowrap border-r border-slate-200/80 dark:border-slate-800 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.06)] dark:shadow-[2px_0_5px_-2px_rgba(0,0,0,0.4)] transition-colors">
                        {rec.id}
                      </td>
                      <td className="px-3 py-3 text-slate-600 dark:text-slate-400 whitespace-nowrap">{rec.date}</td>
                      <td className="px-3 py-3 font-bold text-slate-900 dark:text-white min-w-[180px]">{rec.description}</td>
                      <td className="px-3 py-3 text-slate-600 dark:text-slate-400">{rec.bankAccount}</td>
                      <td className={`px-3 py-3 font-bold whitespace-nowrap ${rec.amount.startsWith('+') ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-white'}`}>{rec.amount}</td>
                      <td className="px-3 py-3 whitespace-nowrap"><Badge variant={getBadgeVariant(rec.status)}>{rec.status}</Badge></td>
                      <td className="pl-3 pr-4 py-3 text-slate-500 font-mono text-[11px] whitespace-nowrap">{rec.matchedEntity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 9. OVERVIEW & REPORTS */}
      {/* ========================================================= */}
      {(activeTab === 'overview' || activeTab === 'reports') && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 h-80 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white font-heading">Financial Revenue & Profit Performance</h3>
                <p className="text-xs text-slate-500">Monthly breakdown of gross revenue, operational expenses, and net profit</p>
              </div>
              <button
                onClick={() => addToast("Exported Financial Profit & Loss Statement PDF", "success")}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100"
              >
                <Download className="h-3.5 w-3.5" /> Export Report
              </button>
            </div>
            <ResponsiveContainer width="100%" height="80%">
              <AreaChart data={FINANCIAL_OVERVIEW_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.5} />
                <XAxis dataKey="month" tick={{ fill: '#64748B', fontSize: 11 }} />
                <YAxis tick={{ fill: '#64748B', fontSize: 11 }} tickFormatter={(v) => `$${v/1000}k`} />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#4F46E5" fill="#4F46E5" fillOpacity={0.2} name="Revenue" />
                <Area type="monotone" dataKey="profit" stroke="#10B981" fill="#10B981" fillOpacity={0.2} name="Net Profit" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* DOCUMENT PREVIEW MODAL (INVOICE / ESTIMATE / CREDIT / PO) */}
      {/* ========================================================= */}
      {activeDocView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs" onClick={() => setActiveDocView(null)} />
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl z-50 flex flex-col">
            {/* Sticky Action Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white font-heading">
                  {activeDocView.type === 'po' ? 'PURCHASE ORDER' : activeDocView.type.toUpperCase()}: {activeDocView.data.id}
                </h3>
                <Badge variant={getBadgeVariant(activeDocView.data.status)}>{activeDocView.data.status}</Badge>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => addToast("PDF Document generated & downloaded", "success")}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 flex items-center gap-1 cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5" /> PDF
                </button>

                {activeDocView.type === 'estimate' && (
                  <button
                    onClick={() => handleConvertEstimateToInvoice(activeDocView.data)}
                    className="px-3.5 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 cursor-pointer flex items-center gap-1"
                  >
                    <CornerDownRight className="h-3.5 w-3.5" /> Convert to Invoice
                  </button>
                )}

                {activeDocView.type === 'invoice' && activeDocView.data.status !== 'Paid' && (
                  <button
                    onClick={() => {
                      const inv = activeDocView.data;
                      setActiveDocView(null);
                      setShowRecordPaymentModal(inv);
                      setPaymentForm({ ...paymentForm, amount: inv.numericAmountDue || inv.numericAmount });
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 cursor-pointer flex items-center gap-1"
                  >
                    <DollarSign className="h-3.5 w-3.5" /> Record Payment
                  </button>
                )}

                {activeDocView.type === 'po' && (activeDocView.data.status === 'Received' || activeDocView.data.status === 'Partially Received') && !activeDocView.data.convertedBillId && (
                  <button
                    onClick={() => {
                      const po = activeDocView.data;
                      handleConvertPoToBill(po);
                      setActiveDocView(null);
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 cursor-pointer flex items-center gap-1"
                  >
                    <CornerDownRight className="h-3.5 w-3.5" /> Convert to Purchase Bill
                  </button>
                )}

                <button onClick={() => setActiveDocView(null)} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Document Content Paper */}
            <div className="p-8 space-y-6 text-xs text-slate-800 dark:text-slate-200">
              {/* Document Header */}
              <div className="flex justify-between items-start pb-6 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 items-center px-2 rounded-lg bg-gradient-to-tr from-indigo-600 to-emerald-500 text-white font-bold text-xs">VEB</div>
                    <span className="font-bold text-base text-slate-900 dark:text-white">VEB ERP Solutions Ltd</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">100 Enterprise Parkway, Suite 400</p>
                  <p className="text-[11px] text-slate-500">billing@veberp.com • +1 800-555-VEB</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-extrabold text-indigo-600 dark:text-indigo-400 block uppercase font-heading">
                    {activeDocView.type === 'invoice' ? 'TAX INVOICE' : activeDocView.type === 'estimate' ? 'PROPOSAL ESTIMATE' : activeDocView.type === 'po' ? 'OFFICIAL PURCHASE ORDER' : 'CREDIT NOTE'}
                  </span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white block mt-0.5">{activeDocView.data.id}</span>
                  <span className="text-[11px] text-slate-500 block mt-1">Date: {activeDocView.data.date || activeDocView.data.issueDate || activeDocView.data.orderDate}</span>
                </div>
              </div>

              {/* Bill To / Supplier Info */}
              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800">
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">
                    {activeDocView.type === 'po' ? 'SUPPLIER / VENDOR' : 'BILLED TO CLIENT'}
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white text-sm block mt-0.5">
                    {activeDocView.data.client || activeDocView.data.supplier || activeDocView.data.vendor}
                  </span>
                  {activeDocView.data.shippingAddress && (
                    <span className="text-[11px] text-slate-500 block mt-1">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">Deliver To:</span> {activeDocView.data.shippingAddress}
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">TOTAL AMOUNT</span>
                  <span className="text-xl font-extrabold text-slate-900 dark:text-white block mt-0.5">
                    {activeDocView.data.amount || activeDocView.data.creditAmount || activeDocView.data.total}
                  </span>
                  {activeDocView.data.amountDue && (
                    <span className="text-xs font-bold text-emerald-600 block">Amount Due: {activeDocView.data.amountDue}</span>
                  )}
                  {activeDocView.data.expectedDate && (
                    <span className="text-[11px] text-slate-500 block mt-1">Expected Delivery: {activeDocView.data.expectedDate}</span>
                  )}
                </div>
              </div>

              {/* Line Items Table */}
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-[10px] font-bold text-slate-400 uppercase">
                    <th className="py-2">Description / Item</th>
                    <th className="py-2 text-center">Qty</th>
                    <th className="py-2 text-right">Unit Rate ($)</th>
                    <th className="py-2 text-right">Amount ($)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {(activeDocView.data.items || [{ desc: activeDocView.data.item || "Enterprise Service Item", qty: activeDocView.data.qty || 1, unitCost: activeDocView.data.unitCost || 100, amount: activeDocView.data.numericTotal || 100 }]).map((item, idx) => (
                    <tr key={idx}>
                      <td className="py-3 font-semibold text-slate-900 dark:text-white">{item.desc}</td>
                      <td className="py-3 text-center">{item.qty}</td>
                      <td className="py-3 text-right">${(item.rate || item.unitCost || 0).toLocaleString()}</td>
                      <td className="py-3 text-right font-bold text-slate-900 dark:text-white">${(item.amount || (item.rate || item.unitCost || 0) * item.qty).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Terms & Audit Log */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-4">
                <div>
                  <p className="font-bold text-slate-700 dark:text-slate-300">Terms & Conditions:</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{activeDocView.data.terms || "Payment due as per agreed corporate terms. Delivery inspection required."}</p>
                </div>

                {/* Audit Trail Section in Detail View */}
                {activeDocView.data.auditTrail && activeDocView.data.auditTrail.length > 0 && (
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block font-heading">
                      Audit Trail & Edit History
                    </span>
                    <div className="space-y-1.5">
                      {activeDocView.data.auditTrail.map((log, idx) => (
                        <div key={idx} className="flex items-center justify-between text-[11px]">
                          <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                            <CheckCircle className="h-3 w-3 text-emerald-500" /> {log.step}
                          </span>
                          <span className="text-[10px] text-slate-500">{log.by} • {log.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: CREATE PURCHASE ORDER (PO) */}
      {/* ========================================================= */}
      {showCreatePoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setShowCreatePoModal(false)} />
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl z-50 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading flex items-center gap-2">
                  <Truck className="h-5 w-5 text-indigo-600" /> Issue Purchase Order
                </h3>
                <p className="text-xs text-slate-500">Unified PO for Raw Materials and General Procurement</p>
              </div>
              <button onClick={() => setShowCreatePoModal(false)} className="text-slate-400 hover:text-slate-600"><X className="h-5 w-5" /></button>
            </div>

            <form onSubmit={handleCreatePoSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Supplier / Vendor</label>
                  <select
                    value={newPoForm.supplier}
                    onChange={(e) => setNewPoForm({ ...newPoForm, supplier: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                  >
                    {SUPPLIER_DIRECTORY.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                    <option value="Dell Technologies">Dell Technologies</option>
                    <option value="Amazon Web Services">Amazon Web Services</option>
                    <option value="FedEx Freight">FedEx Freight</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">PO Classification / Type</label>
                  <select
                    value={newPoForm.type}
                    onChange={(e) => setNewPoForm({ ...newPoForm, type: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-semibold"
                  >
                    <option value="Raw Material">Raw Material (Manufacturing Synced)</option>
                    <option value="General Purchase">General Purchase / Equipment</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Order Date</label>
                  <input
                    type="date"
                    value={newPoForm.orderDate}
                    onChange={(e) => setNewPoForm({ ...newPoForm, orderDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Expected Delivery Date</label>
                  <input
                    type="date"
                    value={newPoForm.expectedDate}
                    onChange={(e) => setNewPoForm({ ...newPoForm, expectedDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Initial Status</label>
                  <select
                    value={newPoForm.status}
                    onChange={(e) => setNewPoForm({ ...newPoForm, status: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-bold"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Sent">Sent</option>
                  </select>
                </div>
              </div>

              {/* Dynamic Line Items */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-900 dark:text-white font-heading">Line Items</label>
                  <button
                    type="button"
                    onClick={() => setNewPoForm({
                      ...newPoForm,
                      items: [...newPoForm.items, { desc: '', qty: 1, unitCost: 100, tax: 0 }]
                    })}
                    className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add Item
                  </button>
                </div>

                <div className="space-y-2">
                  {newPoForm.items.map((item, idx) => (
                    <div key={idx} className="grid grid-cols-12 gap-2 items-center p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/70 dark:border-slate-800">
                      <div className="col-span-5">
                        <input
                          type="text"
                          placeholder="Item description / SKU"
                          value={item.desc}
                          onChange={(e) => {
                            const copy = [...newPoForm.items];
                            copy[idx].desc = e.target.value;
                            setNewPoForm({ ...newPoForm, items: copy });
                          }}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs"
                          required
                        />
                      </div>
                      <div className="col-span-2">
                        <input
                          type="number"
                          placeholder="Qty"
                          min="1"
                          value={item.qty}
                          onChange={(e) => {
                            const copy = [...newPoForm.items];
                            copy[idx].qty = Number(e.target.value);
                            setNewPoForm({ ...newPoForm, items: copy });
                          }}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs"
                          required
                        />
                      </div>
                      <div className="col-span-2">
                        <input
                          type="number"
                          placeholder="Unit Cost ($)"
                          min="0"
                          value={item.unitCost}
                          onChange={(e) => {
                            const copy = [...newPoForm.items];
                            copy[idx].unitCost = Number(e.target.value);
                            setNewPoForm({ ...newPoForm, items: copy });
                          }}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs"
                          required
                        />
                      </div>
                      <div className="col-span-2 text-right font-bold text-slate-900 dark:text-white">
                        ${((item.qty || 0) * (item.unitCost || 0)).toLocaleString()}
                      </div>
                      <div className="col-span-1 text-right">
                        {newPoForm.items.length > 1 && (
                          <button
                            type="button"
                            onClick={() => setNewPoForm({
                              ...newPoForm,
                              items: newPoForm.items.filter((_, i) => i !== idx)
                            })}
                            className="p-1 text-slate-400 hover:text-rose-500"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Subtotal & Calculated Grand Total */}
                <div className="p-3 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-600 dark:text-slate-400">Total Purchase Commitment:</span>
                  <span className="text-base font-extrabold text-indigo-600 dark:text-indigo-400 font-heading">
                    ${calculatePoTotals(newPoForm.items).grandTotal.toLocaleString()}.00
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Shipping Delivery Address</label>
                  <input
                    type="text"
                    value={newPoForm.shippingAddress}
                    onChange={(e) => setNewPoForm({ ...newPoForm, shippingAddress: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Notes & Terms</label>
                  <input
                    type="text"
                    value={newPoForm.notes}
                    onChange={(e) => setNewPoForm({ ...newPoForm, notes: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setShowCreatePoModal(false)} className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold cursor-pointer">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold cursor-pointer">Issue Purchase Order</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: EDIT PURCHASE ORDER (PO) */}
      {/* ========================================================= */}
      {editPoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setEditPoModal(null)} />
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl z-50 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading flex items-center gap-2">
                  <Pencil className="h-5 w-5 text-indigo-600" /> Edit Purchase Order: {editPoModal.id}
                </h3>
                <p className="text-xs text-slate-500">Update supplier, line items, delivery date, and terms</p>
              </div>
              <button onClick={() => setEditPoModal(null)} className="text-slate-400 hover:text-slate-600"><X className="h-5 w-5" /></button>
            </div>

            <form onSubmit={handleSaveEditPo} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Supplier / Vendor</label>
                  <input
                    type="text"
                    value={editPoModal.supplier}
                    onChange={(e) => setEditPoModal({ ...editPoModal, supplier: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-bold"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">PO Classification</label>
                  <select
                    value={editPoModal.type}
                    onChange={(e) => setEditPoModal({ ...editPoModal, type: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-semibold"
                  >
                    <option value="Raw Material">Raw Material (Manufacturing)</option>
                    <option value="General Purchase">General Purchase</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Order Date</label>
                  <input
                    type="date"
                    value={editPoModal.orderDate}
                    onChange={(e) => setEditPoModal({ ...editPoModal, orderDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Expected Delivery</label>
                  <input
                    type="date"
                    value={editPoModal.expectedDate}
                    onChange={(e) => setEditPoModal({ ...editPoModal, expectedDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Status</label>
                  <select
                    value={editPoModal.status}
                    onChange={(e) => setEditPoModal({ ...editPoModal, status: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-bold"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Sent">Sent</option>
                    <option value="Partially Received">Partially Received</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Multi-item editor */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-900 dark:text-white font-heading">Line Items</label>
                  <button
                    type="button"
                    onClick={() => setEditPoModal({
                      ...editPoModal,
                      items: [...(editPoModal.items || []), { desc: '', qty: 1, unitCost: 100, tax: 0 }]
                    })}
                    className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add Item
                  </button>
                </div>

                <div className="space-y-2">
                  {(editPoModal.items || []).map((item, idx) => (
                    <div key={idx} className="grid grid-cols-12 gap-2 items-center p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/70 dark:border-slate-800">
                      <div className="col-span-5">
                        <input
                          type="text"
                          value={item.desc}
                          onChange={(e) => {
                            const copy = [...editPoModal.items];
                            copy[idx].desc = e.target.value;
                            setEditPoModal({ ...editPoModal, items: copy });
                          }}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs"
                          required
                        />
                      </div>
                      <div className="col-span-2">
                        <input
                          type="number"
                          min="1"
                          value={item.qty}
                          onChange={(e) => {
                            const copy = [...editPoModal.items];
                            copy[idx].qty = Number(e.target.value);
                            setEditPoModal({ ...editPoModal, items: copy });
                          }}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs"
                        />
                      </div>
                      <div className="col-span-2">
                        <input
                          type="number"
                          min="0"
                          value={item.unitCost}
                          onChange={(e) => {
                            const copy = [...editPoModal.items];
                            copy[idx].unitCost = Number(e.target.value);
                            setEditPoModal({ ...editPoModal, items: copy });
                          }}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs"
                        />
                      </div>
                      <div className="col-span-2 text-right font-bold text-slate-900 dark:text-white">
                        ${((item.qty || 0) * (item.unitCost || 0)).toLocaleString()}
                      </div>
                      <div className="col-span-1 text-right">
                        {editPoModal.items?.length > 1 && (
                          <button
                            type="button"
                            onClick={() => setEditPoModal({
                              ...editPoModal,
                              items: editPoModal.items.filter((_, i) => i !== idx)
                            })}
                            className="p-1 text-slate-400 hover:text-rose-500"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-600 dark:text-slate-400">Recalculated Grand Total:</span>
                  <span className="text-base font-extrabold text-indigo-600 dark:text-indigo-400 font-heading">
                    ${calculatePoTotals(editPoModal.items || []).grandTotal.toLocaleString()}.00
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Delivery Address</label>
                  <input
                    type="text"
                    value={editPoModal.shippingAddress || ''}
                    onChange={(e) => setEditPoModal({ ...editPoModal, shippingAddress: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Notes / Terms</label>
                  <input
                    type="text"
                    value={editPoModal.notes || ''}
                    onChange={(e) => setEditPoModal({ ...editPoModal, notes: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setEditPoModal(null)} className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold cursor-pointer">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold cursor-pointer">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: EDIT INVOICE */}
      {/* ========================================================= */}
      {editInvoiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setEditInvoiceModal(null)} />
          <div className="relative w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl z-50 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">Edit Invoice: {editInvoiceModal.id}</h3>
              <button onClick={() => setEditInvoiceModal(null)} className="text-slate-400 hover:text-slate-600"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleSaveEditInvoice} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Client Account</label>
                <input type="text" value={editInvoiceModal.client} onChange={(e) => setEditInvoiceModal({ ...editInvoiceModal, client: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-bold" required />
              </div>
              <div>
                <label className="block font-semibold mb-1">Project Link</label>
                <input type="text" value={editInvoiceModal.project || ''} onChange={(e) => setEditInvoiceModal({ ...editInvoiceModal, project: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Line Item Description</label>
                <input type="text" value={editInvoiceModal.desc} onChange={(e) => setEditInvoiceModal({ ...editInvoiceModal, desc: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white" required />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1">Amount ($)</label>
                  <input type="number" value={editInvoiceModal.rate} onChange={(e) => setEditInvoiceModal({ ...editInvoiceModal, rate: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-bold" required />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Due Date</label>
                  <input type="date" value={editInvoiceModal.dueDate} onChange={(e) => setEditInvoiceModal({ ...editInvoiceModal, dueDate: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white" required />
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-1">Status</label>
                <select value={editInvoiceModal.status} onChange={(e) => setEditInvoiceModal({ ...editInvoiceModal, status: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-bold">
                  <option value="Draft">Draft</option>
                  <option value="Sent">Sent</option>
                  <option value="Partially Paid">Partially Paid</option>
                  <option value="Overdue">Overdue</option>
                </select>
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setEditInvoiceModal(null)} className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold cursor-pointer">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold cursor-pointer">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: EDIT ESTIMATE */}
      {/* ========================================================= */}
      {editEstimateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setEditEstimateModal(null)} />
          <div className="relative w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl z-50 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">Edit Proposal: {editEstimateModal.id}</h3>
              <button onClick={() => setEditEstimateModal(null)} className="text-slate-400 hover:text-slate-600"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleSaveEditEstimate} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Client Account</label>
                <input type="text" value={editEstimateModal.client} onChange={(e) => setEditEstimateModal({ ...editEstimateModal, client: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-bold" required />
              </div>
              <div>
                <label className="block font-semibold mb-1">Project Title</label>
                <input type="text" value={editEstimateModal.project} onChange={(e) => setEditEstimateModal({ ...editEstimateModal, project: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white" required />
              </div>
              <div>
                <label className="block font-semibold mb-1">Description</label>
                <input type="text" value={editEstimateModal.desc} onChange={(e) => setEditEstimateModal({ ...editEstimateModal, desc: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white" required />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1">Estimated Value ($)</label>
                  <input type="number" value={editEstimateModal.rate} onChange={(e) => setEditEstimateModal({ ...editEstimateModal, rate: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-bold" required />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Valid Until</label>
                  <input type="date" value={editEstimateModal.validUntil} onChange={(e) => setEditEstimateModal({ ...editEstimateModal, validUntil: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white" required />
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-1">Status</label>
                <select value={editEstimateModal.status} onChange={(e) => setEditEstimateModal({ ...editEstimateModal, status: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-bold">
                  <option value="Draft">Draft</option>
                  <option value="Sent">Sent</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Declined">Declined</option>
                  <option value="Expired">Expired</option>
                </select>
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setEditEstimateModal(null)} className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold cursor-pointer">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold cursor-pointer">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: EDIT PAYMENT */}
      {/* ========================================================= */}
      {editPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setEditPaymentModal(null)} />
          <div className="relative w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl z-50 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">Edit Payment: {editPaymentModal.id}</h3>
              <button onClick={() => setEditPaymentModal(null)} className="text-slate-400 hover:text-slate-600"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleSaveEditPayment} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Client Account</label>
                <input type="text" value={editPaymentModal.client} onChange={(e) => setEditPaymentModal({ ...editPaymentModal, client: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-bold" required />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1">Invoice Ref</label>
                  <input type="text" value={editPaymentModal.invoiceId} onChange={(e) => setEditPaymentModal({ ...editPaymentModal, invoiceId: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-bold" required />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Amount Paid ($)</label>
                  <input type="number" value={editPaymentModal.numericAmount} onChange={(e) => setEditPaymentModal({ ...editPaymentModal, numericAmount: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-bold" required />
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-1">Payment Method</label>
                <select value={editPaymentModal.method} onChange={(e) => setEditPaymentModal({ ...editPaymentModal, method: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">
                  <option value="Bank Wire Transfer">Bank Wire Transfer</option>
                  <option value="Credit Card (Stripe)">Credit Card (Stripe)</option>
                  <option value="ACH Electronic Check">ACH Electronic Check</option>
                  <option value="Direct Deposit">Direct Deposit</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-1">Txn / Ref ID</label>
                <input type="text" value={editPaymentModal.txnId} onChange={(e) => setEditPaymentModal({ ...editPaymentModal, txnId: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-mono" />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setEditPaymentModal(null)} className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold cursor-pointer">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold cursor-pointer">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: EDIT CREDIT NOTE */}
      {/* ========================================================= */}
      {editCreditNoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setEditCreditNoteModal(null)} />
          <div className="relative w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl z-50 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">Edit Credit Note: {editCreditNoteModal.id}</h3>
              <button onClick={() => setEditCreditNoteModal(null)} className="text-slate-400 hover:text-slate-600"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleSaveEditCreditNote} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Client Account</label>
                <input type="text" value={editCreditNoteModal.client} onChange={(e) => setEditCreditNoteModal({ ...editCreditNoteModal, client: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-bold" required />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1">Credit Amount ($)</label>
                  <input type="number" value={editCreditNoteModal.numericCreditAmount} onChange={(e) => setEditCreditNoteModal({ ...editCreditNoteModal, numericCreditAmount: e.target.value, numericRemainingBalance: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-bold" required />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Remaining ($)</label>
                  <input type="number" value={editCreditNoteModal.numericRemainingBalance} onChange={(e) => setEditCreditNoteModal({ ...editCreditNoteModal, numericRemainingBalance: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-bold" required />
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-1">Reason / Note</label>
                <textarea rows={2} value={editCreditNoteModal.reason} onChange={(e) => setEditCreditNoteModal({ ...editCreditNoteModal, reason: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white" />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setEditCreditNoteModal(null)} className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold cursor-pointer">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold cursor-pointer">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: EDIT EXPENSE */}
      {/* ========================================================= */}
      {editExpenseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setEditExpenseModal(null)} />
          <div className="relative w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl z-50 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">Edit Expense: {editExpenseModal.id}</h3>
              <button onClick={() => setEditExpenseModal(null)} className="text-slate-400 hover:text-slate-600"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleSaveEditExpense} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Expense Category</label>
                <input type="text" value={editExpenseModal.category} onChange={(e) => setEditExpenseModal({ ...editExpenseModal, category: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-bold" required />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1">Vendor / Payee</label>
                  <input type="text" value={editExpenseModal.vendor} onChange={(e) => setEditExpenseModal({ ...editExpenseModal, vendor: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white" required />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Amount ($)</label>
                  <input type="text" value={editExpenseModal.amount} onChange={(e) => setEditExpenseModal({ ...editExpenseModal, amount: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-bold" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1">Date</label>
                  <input type="text" value={editExpenseModal.date} onChange={(e) => setEditExpenseModal({ ...editExpenseModal, date: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white" />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Recurring Schedule</label>
                  <select value={editExpenseModal.recurring} onChange={(e) => setEditExpenseModal({ ...editExpenseModal, recurring: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">
                    <option value="No">One-off</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Annual">Annual</option>
                  </select>
                </div>
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setEditExpenseModal(null)} className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold cursor-pointer">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold cursor-pointer">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: EDIT PURCHASE BILL */}
      {/* ========================================================= */}
      {editBillModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setEditBillModal(null)} />
          <div className="relative w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl z-50 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">Edit Purchase Bill: {editBillModal.id}</h3>
              <button onClick={() => setEditBillModal(null)} className="text-slate-400 hover:text-slate-600"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleSaveEditBill} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Vendor Name</label>
                <input type="text" value={editBillModal.vendor} onChange={(e) => setEditBillModal({ ...editBillModal, vendor: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-bold" required />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1">Bill Date</label>
                  <input type="date" value={editBillModal.billDate} onChange={(e) => setEditBillModal({ ...editBillModal, billDate: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white" />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Due Date</label>
                  <input type="date" value={editBillModal.dueDate} onChange={(e) => setEditBillModal({ ...editBillModal, dueDate: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1">Amount ($)</label>
                  <input type="text" value={editBillModal.amount} onChange={(e) => setEditBillModal({ ...editBillModal, amount: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-bold" required />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Status</label>
                  <select value={editBillModal.status} onChange={(e) => setEditBillModal({ ...editBillModal, status: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-bold">
                    <option value="Unpaid">Unpaid</option>
                    <option value="Paid">Paid</option>
                    <option value="Partially Paid">Partially Paid</option>
                  </select>
                </div>
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setEditBillModal(null)} className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold cursor-pointer">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold cursor-pointer">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: CREATE ESTIMATE */}
      {/* ========================================================= */}
      {showCreateEstimateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setShowCreateEstimateModal(false)} />
          <div className="relative w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl z-50 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">Create Proposal Estimate</h3>
              <button onClick={() => setShowCreateEstimateModal(false)} className="text-slate-400 hover:text-slate-600"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleCreateEstimateSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Client Account</label>
                <select value={newEstimate.client} onChange={(e) => setNewEstimate({ ...newEstimate, client: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">
                  <option>Stark Industries</option>
                  <option>CyberDyne Systems</option>
                  <option>Wayne Enterprises</option>
                  <option>Acme Logistics</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-1">Project Title</label>
                <input type="text" value={newEstimate.project} onChange={(e) => setNewEstimate({ ...newEstimate, project: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white" required />
              </div>
              <div>
                <label className="block font-semibold mb-1">Line Item Description</label>
                <input type="text" value={newEstimate.desc} onChange={(e) => setNewEstimate({ ...newEstimate, desc: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white" required />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1">Rate ($)</label>
                  <input type="number" value={newEstimate.rate} onChange={(e) => setNewEstimate({ ...newEstimate, rate: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white" required />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Valid Until</label>
                  <input type="date" value={newEstimate.validUntil} onChange={(e) => setNewEstimate({ ...newEstimate, validUntil: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white" required />
                </div>
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setShowCreateEstimateModal(false)} className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold cursor-pointer">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold cursor-pointer">Create & Send Estimate</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: CREATE INVOICE */}
      {/* ========================================================= */}
      {showCreateInvoiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setShowCreateInvoiceModal(false)} />
          <div className="relative w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl z-50 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">Issue Client Invoice</h3>
              <button onClick={() => setShowCreateInvoiceModal(false)} className="text-slate-400 hover:text-slate-600"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleCreateInvoiceSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Client Account</label>
                <select value={newInvoice.client} onChange={(e) => setNewInvoice({ ...newInvoice, client: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">
                  <option>CyberDyne Systems</option>
                  <option>Stark Industries</option>
                  <option>Wayne Enterprises</option>
                  <option>Acme Logistics</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-1">Project Link</label>
                <input type="text" value={newInvoice.project} onChange={(e) => setNewInvoice({ ...newInvoice, project: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white" required />
              </div>
              <div>
                <label className="block font-semibold mb-1">Line Item Description</label>
                <input type="text" value={newInvoice.desc} onChange={(e) => setNewInvoice({ ...newInvoice, desc: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white" required />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1">Rate ($)</label>
                  <input type="number" value={newInvoice.rate} onChange={(e) => setNewInvoice({ ...newInvoice, rate: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white" required />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Due Date</label>
                  <input type="date" value={newInvoice.dueDate} onChange={(e) => setNewInvoice({ ...newInvoice, dueDate: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white" required />
                </div>
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setShowCreateInvoiceModal(false)} className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold cursor-pointer">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold cursor-pointer">Issue Invoice</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: CREATE EXPENSE */}
      {/* ========================================================= */}
      {showCreateExpenseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setShowCreateExpenseModal(false)} />
          <div className="relative w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl z-50 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">Record Operating Expense</h3>
              <button onClick={() => setShowCreateExpenseModal(false)} className="text-slate-400 hover:text-slate-600"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleCreateExpenseSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Expense Category</label>
                <input type="text" placeholder="e.g. AWS Cloud, Office Utilities" value={newExpense.category} onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white" required />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1">Vendor / Payee</label>
                  <input type="text" placeholder="e.g. Amazon Web Services" value={newExpense.vendor} onChange={(e) => setNewExpense({ ...newExpense, vendor: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white" required />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Amount ($)</label>
                  <input type="number" value={newExpense.amount} onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-bold" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1">Date</label>
                  <input type="date" value={newExpense.date} onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white" />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Recurring Schedule</label>
                  <select value={newExpense.recurring} onChange={(e) => setNewExpense({ ...newExpense, recurring: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">
                    <option value="No">One-off</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Annual">Annual</option>
                  </select>
                </div>
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setShowCreateExpenseModal(false)} className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold cursor-pointer">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold cursor-pointer">Save Expense</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: RECORD PAYMENT */}
      {/* ========================================================= */}
      {showRecordPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setShowRecordPaymentModal(null)} />
          <div className="relative w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl z-50 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">Record Payment Received</h3>
                <p className="text-xs text-slate-500">Invoice {showRecordPaymentModal.id} • {showRecordPaymentModal.client}</p>
              </div>
              <button onClick={() => setShowRecordPaymentModal(null)} className="text-slate-400 hover:text-slate-600"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleRecordPayment} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Amount Paid ($)</label>
                <input
                  type="number"
                  required
                  value={paymentForm.amount}
                  onChange={(e) => setPaymentForm({ ...paymentForm, amount: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-bold"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Payment Method</label>
                <select
                  value={paymentForm.method}
                  onChange={(e) => setPaymentForm({ ...paymentForm, method: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                >
                  <option value="Bank Wire Transfer">Bank Wire Transfer</option>
                  <option value="Credit Card (Stripe)">Credit Card (Stripe)</option>
                  <option value="ACH Electronic Check">ACH Check</option>
                  <option value="Direct Deposit">Direct Deposit</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-1">Transaction Ref / Wire ID</label>
                <input
                  type="text"
                  value={paymentForm.txnId}
                  onChange={(e) => setPaymentForm({ ...paymentForm, txnId: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-mono"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setShowRecordPaymentModal(null)} className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold cursor-pointer">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold cursor-pointer">Confirm Payment</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: CONVERT TO CREDIT NOTE */}
      {/* ========================================================= */}
      {showConvertToCreditNoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setShowConvertToCreditNoteModal(null)} />
          <div className="relative w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl z-50 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">Issue Credit Note</h3>
                <p className="text-xs text-slate-500">Linked Invoice: {showConvertToCreditNoteModal.id}</p>
              </div>
              <button onClick={() => setShowConvertToCreditNoteModal(null)} className="text-slate-400 hover:text-slate-600"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleConvertToCreditNote} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Credit Amount ($)</label>
                <input
                  type="number"
                  required
                  value={creditNoteForm.amount}
                  onChange={(e) => setCreditNoteForm({ ...creditNoteForm, amount: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-bold"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Reason for Credit / Adjustment</label>
                <textarea
                  rows={3}
                  value={creditNoteForm.reason}
                  onChange={(e) => setCreditNoteForm({ ...creditNoteForm, reason: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setShowConvertToCreditNoteModal(null)} className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold cursor-pointer">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold cursor-pointer">Issue Credit Note</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: APPLY CREDIT NOTE TO INVOICE */}
      {/* ========================================================= */}
      {showApplyCreditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setShowApplyCreditModal(null)} />
          <div className="relative w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl z-50 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">Apply Credit Note</h3>
                <p className="text-xs text-slate-500">{showApplyCreditModal.id} • Available: {showApplyCreditModal.remainingBalance}</p>
              </div>
              <button onClick={() => setShowApplyCreditModal(null)} className="text-slate-400 hover:text-slate-600"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleApplyCreditNote} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Target Invoice for {showApplyCreditModal.client}</label>
                <select
                  value={applyCreditForm.targetInvoiceId}
                  onChange={(e) => setApplyCreditForm({ ...applyCreditForm, targetInvoiceId: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                >
                  {invoices.map(i => (
                    <option key={i.id} value={i.id}>{i.id} ({i.client}) - Due {i.amountDue}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-1">Redeem Amount ($)</label>
                <input
                  type="number"
                  required
                  value={applyCreditForm.redeemAmount}
                  onChange={(e) => setApplyCreditForm({ ...applyCreditForm, redeemAmount: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-bold"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setShowApplyCreditModal(null)} className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold cursor-pointer">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold cursor-pointer">Redeem Credit</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: PAYMENT AUDIT TRAIL */}
      {/* ========================================================= */}
      {showPaymentAuditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setShowPaymentAuditModal(null)} />
          <div className="relative w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl z-50 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">Payment Audit Trail</h3>
                <p className="text-xs text-slate-500">{showPaymentAuditModal.id} • {showPaymentAuditModal.amount}</p>
              </div>
              <button onClick={() => setShowPaymentAuditModal(null)} className="text-slate-400 hover:text-slate-600"><X className="h-5 w-5" /></button>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1 text-xs">
              <p><span className="text-slate-500 font-semibold">Client:</span> <span className="font-bold text-slate-900 dark:text-white">{showPaymentAuditModal.client}</span></p>
              <p><span className="text-slate-500 font-semibold">Invoice Ref:</span> <span className="font-bold text-indigo-600">{showPaymentAuditModal.invoiceId}</span></p>
              <p><span className="text-slate-500 font-semibold">Method:</span> <span className="font-semibold text-slate-800 dark:text-slate-200">{showPaymentAuditModal.method}</span></p>
              <p><span className="text-slate-500 font-semibold">Txn ID:</span> <span className="font-mono text-slate-700 dark:text-slate-300">{showPaymentAuditModal.txnId}</span></p>
            </div>

            <div className="space-y-3 pt-1">
              <span className="text-xs font-bold text-slate-900 dark:text-white block font-heading">Timeline & Verification Log</span>
              <div className="space-y-2 relative border-l-2 border-indigo-500/30 pl-4 ml-1 text-xs">
                {(showPaymentAuditModal.auditTrail || []).map((log, idx) => (
                  <div key={idx} className="relative">
                    <span className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full bg-indigo-600 ring-4 ring-indigo-500/20" />
                    <span className="font-bold text-slate-900 dark:text-white block">{log.step}</span>
                    <span className="text-[10px] text-slate-500 block">{log.by} • {log.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button onClick={() => setShowPaymentAuditModal(null)} className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs cursor-pointer">Close Audit Trail</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountingView;
