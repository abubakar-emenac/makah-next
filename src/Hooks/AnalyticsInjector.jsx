import { useEffect } from 'react';
import axios from 'axios';
import { endpoints } from "../Helpers/apiEndpoints";

export default function AnalyticsInjector() {
    useEffect(() => {
        axios.get(endpoints.generalSettings)
            .then((res) => {
                if (res.data.status === 1) {
                    const settings = res.data.result.settings;

                    // ✅ Google Analytics script injection
                    const analyticsSetting = settings.find(
                        setting => setting.ref_name.toLowerCase().includes('google analytics')
                    );

                    if (analyticsSetting?.is_active && analyticsSetting?.contents) {
                        const parser = new DOMParser();
                        const doc = parser.parseFromString(analyticsSetting.contents, 'text/html');
                        const scriptTags = doc.querySelectorAll('script');

                        scriptTags.forEach(originalScript => {
                            const script = document.createElement('script');

                            if (originalScript.src) {
                                script.src = originalScript.src;
                                script.async = originalScript.async;
                                script.defer = originalScript.defer;
                            } else {
                                script.textContent = originalScript.textContent;
                            }

                            document.head.appendChild(script);
                        });
                    }

                    // ✅ Google Can Index meta tag injection (based on setting ID 18)
                    const indexSetting = settings.find(s => s.id === 18);

                    const shouldAddMetaTag =
                        indexSetting?.is_active === true &&
                        indexSetting?.contents?.enable_google_can_index === '0';

                    if (shouldAddMetaTag) {
                        const metaTag = document.createElement('meta');
                        metaTag.name = 'robots';
                        metaTag.content = 'noindex, nofollow';
                        document.head.appendChild(metaTag);
                    }
                }
            })
            .catch((err) => {
                console.error('❌ Error fetching general settings:', err);
            });
    }, []);

    return null; // No UI
}
