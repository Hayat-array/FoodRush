import mongoose from 'mongoose';

const staffMemberSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    role: {
        type: String,
        enum: ['super_admin', 'manager', 'kitchen', 'delivery'],
        required: true
    },
    permissions: {
        manageOrders: { type: Boolean, default: false },
        manageMenu: { type: Boolean, default: false },
        manageStaff: { type: Boolean, default: false },
        viewReports: { type: Boolean, default: false },
        manageSettings: { type: Boolean, default: false },
        managePayments: { type: Boolean, default: false }
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const restaurantSettingsSchema = new mongoose.Schema({
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true,
        unique: true
    },

    // 1. ADMIN & STAFF MANAGEMENT
    staff: [staffMemberSchema],

    // 2. RESTAURANT PROFILE
    profile: {
        name: String,
        logo: String,
        banner: String,
        description: String,
        cuisineTypes: [String],
        phone: String,
        email: String,
        address: {
            street: String,
            city: String,
            state: String,
            zipCode: String,
            coordinates: {
                lat: Number,
                lng: Number
            }
        },
        socialMedia: {
            facebook: String,
            instagram: String,
            twitter: String,
            website: String
        }
    },

    // 3. OPENING & AVAILABILITY
    availability: {
        schedule: [{
            day: {
                type: String,
                enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
            },
            isOpen: {
                type: Boolean,
                default: true
            },
            slots: [{
                openTime: String, // '09:00'
                closeTime: String // '22:00'
            }]
        }],
        holidays: [{
            date: Date,
            reason: String
        }],
        temporaryClosed: {
            isActive: {
                type: Boolean,
                default: false
            },
            reason: String,
            until: Date
        },
        autoToggle: {
            type: Boolean,
            default: true
        }
    },

    // 4. MENU SETTINGS
    menuSettings: {
        categoriesOrder: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'
        }],
        showOutOfStock: {
            type: Boolean,
            default: true
        },
        autoHideUnavailable: {
            type: Boolean,
            default: false
        }
    },

    // 5. ORDER MANAGEMENT
    orderSettings: {
        autoAccept: {
            type: Boolean,
            default: false
        },
        acceptanceTimeout: {
            type: Number,
            default: 10 // minutes
        },
        preparationTime: {
            min: {
                type: Number,
                default: 20
            },
            max: {
                type: Number,
                default: 40
            }
        },
        statusFlow: {
            type: [String],
            default: ['pending', 'confirmed', 'preparing', 'ready', 'out_for_delivery', 'delivered']
        },
        cancellationReasons: {
            type: [String],
            default: ['Out of stock', 'Restaurant busy', 'Customer request', 'Payment issue', 'Other']
        },
        maxActiveOrders: {
            type: Number,
            default: 50
        }
    },

    // 6. DELIVERY SETTINGS
    delivery: {
        enabled: {
            type: Boolean,
            default: true
        },
        radius: {
            type: Number,
            default: 5 // km
        },
        baseCharge: {
            type: Number,
            default: 40
        },
        perKmCharge: {
            type: Number,
            default: 10
        },
        freeDeliveryAbove: {
            type: Number,
            default: 500
        },
        minOrderValue: {
            type: Number,
            default: 100
        },
        estimatedTime: {
            min: {
                type: Number,
                default: 30
            },
            max: {
                type: Number,
                default: 45
            }
        },
        zones: [{
            name: String,
            coordinates: [[Number]], // Polygon
            charge: Number
        }]
    },

    // 7. PAYMENT SETTINGS
    payment: {
        cod: {
            enabled: {
                type: Boolean,
                default: true
            },
            maxAmount: {
                type: Number,
                default: 5000
            }
        },
        online: {
            enabled: {
                type: Boolean,
                default: true
            },
            upi: {
                type: Boolean,
                default: true
            },
            card: {
                type: Boolean,
                default: true
            },
            wallet: {
                type: Boolean,
                default: true
            }
        },
        gateway: {
            provider: String, // 'razorpay', 'stripe'
            apiKey: String,
            secretKey: String
        },
        refundPolicy: {
            enabled: {
                type: Boolean,
                default: true
            },
            processingDays: {
                type: Number,
                default: 7
            }
        }
    },

    // 8. OFFERS & COUPONS
    coupons: [{
        code: {
            type: String,
            required: true,
            uppercase: true
        },
        type: {
            type: String,
            enum: ['flat', 'percentage'],
            required: true
        },
        value: {
            type: Number,
            required: true
        },
        minOrder: {
            type: Number,
            default: 0
        },
        maxDiscount: Number,
        validFrom: Date,
        validUntil: Date,
        usageLimit: Number,
        usedCount: {
            type: Number,
            default: 0
        },
        applicableOn: {
            type: String,
            enum: ['all', 'first_order', 'specific_items'],
            default: 'all'
        },
        isActive: {
            type: Boolean,
            default: true
        }
    }],

    // 9. CUSTOMER MANAGEMENT
    customerSettings: {
        allowReviews: {
            type: Boolean,
            default: true
        },
        requireVerification: {
            type: Boolean,
            default: false
        },
        loyaltyProgram: {
            enabled: {
                type: Boolean,
                default: false
            },
            pointsPerRupee: {
                type: Number,
                default: 1
            },
            redeemValue: {
                type: Number,
                default: 1
            }
        },
        blockedCustomers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }]
    },

    // 10. REVIEWS & RATINGS
    reviewSettings: {
        enabled: {
            type: Boolean,
            default: true
        },
        requireModeration: {
            type: Boolean,
            default: false
        },
        minOrdersToReview: {
            type: Number,
            default: 1
        },
        allowPhotos: {
            type: Boolean,
            default: true
        },
        autoPublish: {
            type: Boolean,
            default: true
        },
        adminReplyEnabled: {
            type: Boolean,
            default: true
        }
    },

    // 11. NOTIFICATIONS & ALERTS
    notifications: {
        newOrder: {
            sound: {
                type: Boolean,
                default: true
            },
            email: {
                type: Boolean,
                default: true
            },
            sms: {
                type: Boolean,
                default: false
            },
            whatsapp: {
                type: Boolean,
                default: false
            }
        },
        lowStock: {
            enabled: {
                type: Boolean,
                default: true
            },
            threshold: {
                type: Number,
                default: 10
            }
        },
        dailyReport: {
            enabled: {
                type: Boolean,
                default: false
            },
            time: {
                type: String,
                default: '09:00'
            },
            recipients: [String]
        }
    },

    // 12. ANALYTICS
    analytics: {
        googleAnalyticsId: String,
        trackingEnabled: {
            type: Boolean,
            default: false
        },
        reportSchedule: {
            type: String,
            enum: ['daily', 'weekly', 'monthly'],
            default: 'weekly'
        },
        emailReports: [String]
    },

    // 13. SYSTEM & APP SETTINGS
    system: {
        tax: {
            gst: {
                type: Number,
                default: 5
            },
            serviceCharge: {
                type: Number,
                default: 0
            },
            packagingCharge: {
                type: Number,
                default: 10
            }
        },
        currency: {
            type: String,
            default: 'INR'
        },
        language: {
            type: String,
            default: 'en'
        },
        timezone: {
            type: String,
            default: 'Asia/Kolkata'
        },
        maintenanceMode: {
            enabled: {
                type: Boolean,
                default: false
            },
            message: String
        },
        invoice: {
            prefix: {
                type: String,
                default: 'INV'
            },
            startNumber: {
                type: Number,
                default: 1000
            },
            showGST: {
                type: Boolean,
                default: true
            },
            gstNumber: String
        }
    },

    // 14. SECURITY SETTINGS
    security: {
        passwordPolicy: {
            minLength: {
                type: Number,
                default: 8
            },
            requireSpecialChar: {
                type: Boolean,
                default: true
            },
            requireNumber: {
                type: Boolean,
                default: true
            },
            expiryDays: {
                type: Number,
                default: 90
            }
        },
        twoFactorAuth: {
            type: Boolean,
            default: false
        },
        sessionTimeout: {
            type: Number,
            default: 60 // minutes
        },
        ipWhitelist: [String],
        loginAttempts: {
            max: {
                type: Number,
                default: 5
            },
            lockoutDuration: {
                type: Number,
                default: 30 // minutes
            }
        }
    },

    // 15. INTEGRATIONS
    integrations: {
        whatsapp: {
            enabled: {
                type: Boolean,
                default: false
            },
            apiKey: String,
            phoneNumber: String
        },
        googleMaps: {
            apiKey: String
        },
        sms: {
            provider: String,
            apiKey: String
        }
    },

    // 16. SMART & ADVANCED FEATURES
    advanced: {
        aiRecommendations: {
            type: Boolean,
            default: false
        },
        peakHourSurcharge: {
            enabled: {
                type: Boolean,
                default: false
            },
            hours: [{
                start: String,
                end: String
            }],
            percentage: {
                type: Number,
                default: 10
            }
        },
        dynamicPricing: {
            enabled: {
                type: Boolean,
                default: false
            },
            demandMultiplier: {
                type: Number,
                default: 1.2
            }
        },
        qrMenu: {
            enabled: {
                type: Boolean,
                default: false
            },
            qrCode: String
        },
        tableBooking: {
            enabled: {
                type: Boolean,
                default: false
            },
            maxTables: {
                type: Number,
                default: 20
            }
        }
    },

    updatedAt: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Update timestamp on save
restaurantSettingsSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

// Indexes
restaurantSettingsSchema.index({ restaurant: 1 });
restaurantSettingsSchema.index({ 'staff.user': 1 });

const RestaurantSettings = mongoose.models.RestaurantSettings || mongoose.model('RestaurantSettings', restaurantSettingsSchema);

export default RestaurantSettings;
