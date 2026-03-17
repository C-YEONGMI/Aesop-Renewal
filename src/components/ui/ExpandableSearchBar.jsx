import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { cn } from '../../lib/utils';
import './ExpandableSearchBar.scss';

const COLLAPSED_SIZE = 24;

export default function ExpandableSearchBar(props) {
  const {
    expandDirection = 'left',
    placeholder = '제품을 검색하세요',
    onSearch,
    className = '',
    defaultOpen = false,
    width = 300,
  } = props;

  const [open, setOpen] = useState(defaultOpen);
  const [value, setValue] = useState('');
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  // Use scss classes instead of tailwind where structural/theme specific
  const inputPaddingClass = expandDirection === 'right' ? 'search-input--right' : 'search-input--left';
  const placeholderClass = expandDirection === 'right' ? 'search-placeholder--right' : 'search-placeholder--left';

  useEffect(() => {
    function onDocClick(e) {
      if (
        !containerRef.current?.contains(e.target) &&
        open &&
        value === ''
      ) {
        setOpen(false);
        setValue('');
      }
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [open, value]);

  useEffect(() => {
    if (open) {
      const id = setTimeout(() => inputRef.current?.focus(), 120);
      return () => clearTimeout(id);
    } else {
      setValue('');
    }
  }, [open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.(value);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && open) {
        setOpen(false);
        setValue('');
      }

      if (e.key === 'Enter' && open && value.trim()) {
        onSearch?.(value);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, value, onSearch]);

  return (
    <div
      ref={containerRef}
      className={cn('expandable-search', className)}
      style={{ width: COLLAPSED_SIZE, height: COLLAPSED_SIZE }}
    >
      {/* Icon button (always visible) */}
      <button
        type='button'
        aria-label={open ? 'Close search' : 'Open search'}
        onClick={(e) => {
            e.preventDefault();
            setOpen((s) => !s);
        }}
        className='search-toggle-btn'
      >
        {open ? <X size={20} /> : <Search size={20} />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.form
            key='form'
            onSubmit={handleSubmit}
            className={cn(
              'search-form',
              expandDirection === 'left' ? 'search-form--expand-left' : 'search-form--expand-right'
            )}
            initial={{ width: COLLAPSED_SIZE, opacity: 0.98 }}
            animate={{ width: width, opacity: 1 }}
            exit={{
              width: COLLAPSED_SIZE,
              opacity: 0,
              transition: { type: 'spring', stiffness: 260, damping: 26 },
            }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          >
            {/* Absolutely positioned search icon for the expanded state */}
            {expandDirection === 'left' && (
              <button
                 type="submit" 
                 aria-label="Submit search"
                 className="search-submit-btn"
              >
                  <Search size={22} className="search-icon-submit" />
              </button>
            )}

            <div className='search-input-wrapper'>
              <input
                ref={inputRef}
                type='text'
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={placeholder}
                className={cn('search-input', inputPaddingClass)}
              />

              <AnimatePresence>
                {open && !value && (
                  <motion.span
                    key='ph'
                    className={cn('search-placeholder', placeholderClass)}
                    initial={{ opacity: 1, x: 0 }}
                    animate={{ opacity: 0.9, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    transition={{ duration: 0.2 }}
                  >
                    {placeholder}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
