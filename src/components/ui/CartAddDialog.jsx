import React from 'react';
import { ShoppingBag, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useCartStore from '../../store/useCartStore';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from './Dialog';
import './CartAddDialog.scss';

const CartAddDialog = () => {
    const navigate = useNavigate();
    const isCartDialogOpen = useCartStore((state) => state.isCartDialogOpen);
    const cartDialogItem = useCartStore((state) => state.cartDialogItem);
    const closeCartDialog = useCartStore((state) => state.closeCartDialog);

    const formattedPrice =
        typeof cartDialogItem?.price === 'number'
            ? `${cartDialogItem.price.toLocaleString('ko-KR')}원`
            : '';

    const handleOpenChange = (nextOpen) => {
        if (!nextOpen) {
            closeCartDialog();
        }
    };

    const handleGoToCart = () => {
        closeCartDialog();
        navigate('/cart');
    };

    return (
        <Dialog open={isCartDialogOpen} onOpenChange={handleOpenChange}>
            <DialogContent
                className="cart-add-dialog"
                aria-describedby="cart-add-dialog-description"
            >
                <div className="cart-add-dialog__status" aria-hidden="true">
                    <Check size={20} strokeWidth={2.2} />
                </div>

                <DialogHeader className="cart-add-dialog__header">
                    <p className="cart-add-dialog__eyebrow suit-12-r">Shopping Bag</p>
                    <DialogTitle className="cart-add-dialog__title optima-40">
                        장바구니에 담았습니다
                    </DialogTitle>
                    <DialogDescription
                        className="cart-add-dialog__description suit-16-r"
                        id="cart-add-dialog-description"
                    >
                        선택하신 제품이 장바구니에 안전하게 추가되었습니다.
                    </DialogDescription>
                </DialogHeader>

                {cartDialogItem ? (
                    <div className="cart-add-dialog__item">
                        <div className="cart-add-dialog__thumb">
                            <img
                                src={cartDialogItem.image}
                                alt={cartDialogItem.productName}
                            />
                        </div>

                        <div className="cart-add-dialog__copy">
                            <p className="cart-add-dialog__category suit-12-r">
                                {cartDialogItem.category}
                            </p>
                            <p className="cart-add-dialog__name suit-18-m">
                                {cartDialogItem.productName}
                            </p>
                            {cartDialogItem.variant ? (
                                <p className="cart-add-dialog__meta suit-14-m">
                                    {cartDialogItem.variant}
                                </p>
                            ) : null}
                            {formattedPrice ? (
                                <p className="cart-add-dialog__price suit-14-m">
                                    {formattedPrice}
                                </p>
                            ) : null}
                        </div>
                    </div>
                ) : null}

                <DialogFooter className="cart-add-dialog__actions">
                    <DialogClose asChild>
                        <button
                            type="button"
                            className="cart-add-dialog__button cart-add-dialog__button--secondary suit-14-m"
                        >
                            계속 쇼핑하기
                        </button>
                    </DialogClose>

                    <button
                        type="button"
                        className="cart-add-dialog__button cart-add-dialog__button--primary suit-14-m"
                        onClick={handleGoToCart}
                    >
                        <ShoppingBag size={16} strokeWidth={1.8} />
                        장바구니 보기
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CartAddDialog;
