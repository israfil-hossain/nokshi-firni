export default function StructuredData() {
    const organizationSchema = {
        '@context': 'https://schema.org',
        '@type': 'FoodEstablishment',
        name: 'নকশি ফিরনি',
        alternateName: 'Nokshi Firni',
        description: 'ঐতিহ্যবাহী বাংলাদেশি ফিরনি। প্রিমিয়াম চাল, খাঁটি দুধ ও প্রাকৃতিক উপকরণ দিয়ে তৈরি।',
        url: 'https://www.biyebari.flowtim.com',
        telephone: '+8801723560254',
        priceRange: '৳৩০-৳২০০',
        servesCuisine: 'Bangladeshi',
        image: 'https://www.biyebari.flowtim.com/nokshi-firni.png',
        logo: 'https://www.biyebari.flowtim.com/biyebari.png',
        address: {
            '@type': 'PostalAddress',
            addressCountry: 'BD',
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: 23.8103,
            longitude: 90.4125,
        },
        sameAs: [
            'https://wa.me/8801723560254',
        ],
    }

    const productSchemas = [
        {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: '১৫০ গ্রাম ফিরনি',
            alternateName: '150gm Firni Cup',
            description: 'ঐতিহ্যবাহী ১৫০ গ্রাম ফিরনি - এক কাপ। প্রিমিয়াম চাল ও খাঁটি দুধ দিয়ে তৈরি।',
            image: 'https://www.biyebari.flowtim.com/nokshi-firni.png',
            brand: {
                '@type': 'Brand',
                name: 'নকশি',
            },
            offers: {
                '@type': 'Offer',
                price: '30',
                priceCurrency: 'BDT',
                availability: 'https://schema.org/InStock',
                itemCondition: 'https://schema.org/NewCondition',
            },
            aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.8',
                reviewCount: '150',
            },
        },
        {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: '৫০০ গ্রাম ফিরনি',
            alternateName: '500gm Firni Box',
            description: 'ঐতিহ্যবাহী ৫০০ গ্রাম ফিরনি - এক বক্স। পারিবারিক পার্টির জন্য আদর্শ।',
            image: 'https://www.biyebari.flowtim.com/nokshi-firni.png',
            brand: {
                '@type': 'Brand',
                name: 'নকশি',
            },
            offers: {
                '@type': 'Offer',
                price: '100',
                priceCurrency: 'BDT',
                availability: 'https://schema.org/InStock',
                itemCondition: 'https://schema.org/NewCondition',
            },
            aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.9',
                reviewCount: '120',
            },
        },
        {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: '১ কেজি ফিরনি',
            alternateName: '1kg Firni Box',
            description: 'ঐতিহ্যবাহী ১ কেজি ফিরনি - বড় বক্স। ইভেন্ট ও অনুষ্ঠানের জন্য উপযুক্ত।',
            image: 'https://www.biyebari.flowtim.com/nokshi-firni.png',
            brand: {
                '@type': 'Brand',
                name: 'নকশি',
            },
            offers: {
                '@type': 'Offer',
                price: '200',
                priceCurrency: 'BDT',
                availability: 'https://schema.org/InStock',
                itemCondition: 'https://schema.org/NewCondition',
            },
            aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.9',
                reviewCount: '80',
            },
        },
    ]

    const websiteSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'নকশি ফিরনি',
        url: 'https://www.biyebari.flowtim.com',
        description: 'ঐতিহ্যবাহী বাংলাদেশি ফিরনি অর্ডার করুন',
        inLanguage: 'bn',
    }

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'হোম',
                item: 'https://www.biyebari.flowtim.com',
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'পণ্য',
                item: 'https://www.biyebari.flowtim.com#products',
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: 'অর্ডার',
                item: 'https://www.biyebari.flowtim.com#order',
            },
            {
                '@type': 'ListItem',
                position: 4,
                name: 'প্রি-অর্ডার',
                item: 'https://www.biyebari.flowtim.com#preorder',
            },
        ],
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
            {productSchemas.map((schema, index) => (
                <script
                    key={index}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            ))}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
        </>
    )
}
