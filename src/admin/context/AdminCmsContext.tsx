import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAdminAuth } from './AdminAuthContext';
import { 
  CmsDatabase, 
  EducationItem, 
  ExperienceCmsItem, 
  SkillCmsItem, 
  CertificateCmsItem, 
  ProjectCmsItem, 
  ServiceCmsItem, 
  AchievementCmsItem, 
  TestimonialCmsItem, 
  SocialLinkCmsItem, 
  NavCmsItem, 
  MediaItem, 
  ActivityLog, 
  PersonalInfo, 
  HeroSettings, 
  AboutSettings, 
  ContactSettings, 
  SeoSettings, 
  SiteSettings 
} from '../../server/cmsStore';

export interface ToastItem {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
}

interface AdminCmsContextValue {
  db: CmsDatabase | null;
  loading: boolean;
  saving: boolean;
  isDraftDirty: boolean;
  toasts: ToastItem[];
  showToast: (type: ToastItem['type'], title: string, message?: string) => void;
  removeToast: (id: string) => void;
  fetchFullDatabase: () => Promise<void>;
  publishAllChanges: () => Promise<boolean>;
  resetToDefaults: () => Promise<boolean>;
  
  // Section Updaters
  updatePersonalInfo: (data: PersonalInfo) => Promise<boolean>;
  updateHero: (data: HeroSettings) => Promise<boolean>;
  updateAbout: (data: AboutSettings) => Promise<boolean>;
  updateContact: (data: ContactSettings) => Promise<boolean>;
  updateSeo: (data: SeoSettings) => Promise<boolean>;
  updateSiteSettings: (data: SiteSettings) => Promise<boolean>;

  // CRUD Helpers
  saveEducation: (item: Partial<EducationItem>, isNew?: boolean) => Promise<boolean>;
  deleteEducation: (id: string) => Promise<boolean>;

  saveExperience: (item: Partial<ExperienceCmsItem>, isNew?: boolean) => Promise<boolean>;
  deleteExperience: (id: string) => Promise<boolean>;

  saveSkill: (item: Partial<SkillCmsItem>, isNew?: boolean) => Promise<boolean>;
  deleteSkill: (id: string) => Promise<boolean>;

  saveCertificate: (item: Partial<CertificateCmsItem>, isNew?: boolean) => Promise<boolean>;
  deleteCertificate: (id: string) => Promise<boolean>;

  saveProject: (item: Partial<ProjectCmsItem>, isNew?: boolean) => Promise<boolean>;
  deleteProject: (id: string) => Promise<boolean>;

  saveService: (item: Partial<ServiceCmsItem>, isNew?: boolean) => Promise<boolean>;
  deleteService: (id: string) => Promise<boolean>;

  saveAchievement: (item: Partial<AchievementCmsItem>, isNew?: boolean) => Promise<boolean>;
  deleteAchievement: (id: string) => Promise<boolean>;

  saveTestimonial: (item: Partial<TestimonialCmsItem>, isNew?: boolean) => Promise<boolean>;
  deleteTestimonial: (id: string) => Promise<boolean>;

  saveSocialLink: (item: Partial<SocialLinkCmsItem>, isNew?: boolean) => Promise<boolean>;
  deleteSocialLink: (id: string) => Promise<boolean>;

  saveNavigationItem: (item: Partial<NavCmsItem>, isNew?: boolean) => Promise<boolean>;
  deleteNavigationItem: (id: string) => Promise<boolean>;

  // Media
  uploadMedia: (fileName: string, fileType: string, base64Data: string) => Promise<MediaItem | null>;
  deleteMedia: (id: string) => Promise<boolean>;

  // Activity Logs
  fetchActivityLogs: () => Promise<ActivityLog[]>;
}

const AdminCmsContext = createContext<AdminCmsContextValue | null>(null);

export function AdminCmsProvider({ children }: { children: React.ReactNode }) {
  const { token, isAuthenticated } = useAdminAuth();
  const [db, setDb] = useState<CmsDatabase | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [isDraftDirty, setIsDraftDirty] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback((type: ToastItem['type'], title: string, message?: string) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const authHeaders = useCallback(() => {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    };
  }, [token]);

  const fetchFullDatabase = useCallback(async () => {
    if (!token || !isAuthenticated) return;
    try {
      setLoading(true);
      const res = await fetch('/api/cms/all', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setDb(json.data);
        }
      }
    } catch (err) {
      showToast('error', 'Failed to load CMS data', 'Network or server error.');
    } finally {
      setLoading(false);
    }
  }, [token, isAuthenticated, showToast]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchFullDatabase();
    }
  }, [isAuthenticated, fetchFullDatabase]);

  const publishAllChanges = async (): Promise<boolean> => {
    try {
      setSaving(true);
      const res = await fetch('/api/cms/publish', {
        method: 'POST',
        headers: authHeaders()
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setDb(json.data);
        setIsDraftDirty(false);
        showToast('success', 'Published to Live Website', 'All staged updates are now active on your public portfolio.');
        return true;
      }
      showToast('error', 'Publish Failed', json.error || 'Could not publish changes.');
      return false;
    } catch (err: any) {
      showToast('error', 'Publish Error', err.message);
      return false;
    } finally {
      setSaving(false);
    }
  };

  const resetToDefaults = async (): Promise<boolean> => {
    try {
      setSaving(true);
      const res = await fetch('/api/cms/reset-defaults', {
        method: 'POST',
        headers: authHeaders()
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setDb(json.data);
        setIsDraftDirty(false);
        showToast('success', 'Reset Complete', 'Database restored to initial seeded state.');
        return true;
      }
      showToast('error', 'Reset Failed', json.error);
      return false;
    } catch (err: any) {
      showToast('error', 'Reset Error', err.message);
      return false;
    } finally {
      setSaving(false);
    }
  };

  // Section Updaters
  const updatePersonalInfo = async (data: PersonalInfo): Promise<boolean> => {
    try {
      setSaving(true);
      const res = await fetch('/api/cms/profile', {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(data)
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setDb(prev => prev ? { ...prev, personalInfo: json.data } : null);
        setIsDraftDirty(true);
        showToast('success', 'Profile Saved', 'Personal information updated successfully.');
        return true;
      }
      showToast('error', 'Save Failed', json.error);
      return false;
    } catch (err: any) {
      showToast('error', 'Save Error', err.message);
      return false;
    } finally {
      setSaving(false);
    }
  };

  const updateHero = async (data: HeroSettings): Promise<boolean> => {
    try {
      setSaving(true);
      const res = await fetch('/api/cms/hero', {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(data)
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setDb(prev => prev ? { ...prev, hero: json.data } : null);
        setIsDraftDirty(true);
        showToast('success', 'Hero Saved', 'Hero banner settings updated successfully.');
        return true;
      }
      showToast('error', 'Save Failed', json.error);
      return false;
    } catch (err: any) {
      showToast('error', 'Save Error', err.message);
      return false;
    } finally {
      setSaving(false);
    }
  };

  const updateAbout = async (data: AboutSettings): Promise<boolean> => {
    try {
      setSaving(true);
      const res = await fetch('/api/cms/about', {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(data)
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setDb(prev => prev ? { ...prev, about: json.data } : null);
        setIsDraftDirty(true);
        showToast('success', 'About Saved', 'About section bio and details updated.');
        return true;
      }
      showToast('error', 'Save Failed', json.error);
      return false;
    } catch (err: any) {
      showToast('error', 'Save Error', err.message);
      return false;
    } finally {
      setSaving(false);
    }
  };

  const updateContact = async (data: ContactSettings): Promise<boolean> => {
    try {
      setSaving(true);
      const res = await fetch('/api/cms/contact', {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(data)
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setDb(prev => prev ? { ...prev, contact: json.data } : null);
        setIsDraftDirty(true);
        showToast('success', 'Contact Channels Saved', 'Contact channels and form configuration updated.');
        return true;
      }
      showToast('error', 'Save Failed', json.error);
      return false;
    } catch (err: any) {
      showToast('error', 'Save Error', err.message);
      return false;
    } finally {
      setSaving(false);
    }
  };

  const updateSeo = async (data: SeoSettings): Promise<boolean> => {
    try {
      setSaving(true);
      const res = await fetch('/api/cms/seo', {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(data)
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setDb(prev => prev ? { ...prev, seo: json.data } : null);
        setIsDraftDirty(true);
        showToast('success', 'SEO Saved', 'Meta tags, OG preview, and robots/sitemap updated.');
        return true;
      }
      showToast('error', 'Save Failed', json.error);
      return false;
    } catch (err: any) {
      showToast('error', 'Save Error', err.message);
      return false;
    } finally {
      setSaving(false);
    }
  };

  const updateSiteSettings = async (data: SiteSettings): Promise<boolean> => {
    try {
      setSaving(true);
      const res = await fetch('/api/cms/settings', {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(data)
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setDb(prev => prev ? { ...prev, siteSettings: json.data } : null);
        setIsDraftDirty(true);
        showToast('success', 'Website Settings Saved', 'Maintenance mode and site preferences updated.');
        return true;
      }
      showToast('error', 'Save Failed', json.error);
      return false;
    } catch (err: any) {
      showToast('error', 'Save Error', err.message);
      return false;
    } finally {
      setSaving(false);
    }
  };

  // Generic CRUD Handlers
  const saveEducation = async (item: Partial<EducationItem>, isNew = false): Promise<boolean> => {
    try {
      setSaving(true);
      const method = isNew ? 'POST' : 'PUT';
      const endpoint = isNew ? '/api/cms/education' : `/api/cms/education/${item.id}`;
      const res = await fetch(endpoint, {
        method,
        headers: authHeaders(),
        body: JSON.stringify(item)
      });
      const json = await res.json();
      if (res.ok && json.success) {
        await fetchFullDatabase();
        setIsDraftDirty(true);
        showToast('success', isNew ? 'Education Added' : 'Education Updated');
        return true;
      }
      showToast('error', 'Save Failed', json.error);
      return false;
    } catch (err: any) {
      showToast('error', 'Error', err.message);
      return false;
    } finally {
      setSaving(false);
    }
  };

  const deleteEducation = async (id: string): Promise<boolean> => {
    try {
      setSaving(true);
      const res = await fetch(`/api/cms/education/${id}`, {
        method: 'DELETE',
        headers: authHeaders()
      });
      if (res.ok) {
        await fetchFullDatabase();
        setIsDraftDirty(true);
        showToast('success', 'Education Removed');
        return true;
      }
      showToast('error', 'Delete Failed');
      return false;
    } catch (err: any) {
      showToast('error', 'Error', err.message);
      return false;
    } finally {
      setSaving(false);
    }
  };

  const saveExperience = async (item: Partial<ExperienceCmsItem>, isNew = false): Promise<boolean> => {
    try {
      setSaving(true);
      const method = isNew ? 'POST' : 'PUT';
      const endpoint = isNew ? '/api/cms/experience' : `/api/cms/experience/${item.id}`;
      const res = await fetch(endpoint, {
        method,
        headers: authHeaders(),
        body: JSON.stringify(item)
      });
      const json = await res.json();
      if (res.ok && json.success) {
        await fetchFullDatabase();
        setIsDraftDirty(true);
        showToast('success', isNew ? 'Experience Added' : 'Experience Updated');
        return true;
      }
      showToast('error', 'Save Failed', json.error);
      return false;
    } catch (err: any) {
      showToast('error', 'Error', err.message);
      return false;
    } finally {
      setSaving(false);
    }
  };

  const deleteExperience = async (id: string): Promise<boolean> => {
    try {
      setSaving(true);
      const res = await fetch(`/api/cms/experience/${id}`, {
        method: 'DELETE',
        headers: authHeaders()
      });
      if (res.ok) {
        await fetchFullDatabase();
        setIsDraftDirty(true);
        showToast('success', 'Experience Removed');
        return true;
      }
      showToast('error', 'Delete Failed');
      return false;
    } catch (err: any) {
      showToast('error', 'Error', err.message);
      return false;
    } finally {
      setSaving(false);
    }
  };

  const saveSkill = async (item: Partial<SkillCmsItem>, isNew = false): Promise<boolean> => {
    try {
      setSaving(true);
      const method = isNew ? 'POST' : 'PUT';
      const endpoint = isNew ? '/api/cms/skills' : `/api/cms/skills/${item.id}`;
      const res = await fetch(endpoint, {
        method,
        headers: authHeaders(),
        body: JSON.stringify(item)
      });
      const json = await res.json();
      if (res.ok && json.success) {
        await fetchFullDatabase();
        setIsDraftDirty(true);
        showToast('success', isNew ? 'Skill Added' : 'Skill Updated');
        return true;
      }
      showToast('error', 'Save Failed', json.error);
      return false;
    } catch (err: any) {
      showToast('error', 'Error', err.message);
      return false;
    } finally {
      setSaving(false);
    }
  };

  const deleteSkill = async (id: string): Promise<boolean> => {
    try {
      setSaving(true);
      const res = await fetch(`/api/cms/skills/${id}`, {
        method: 'DELETE',
        headers: authHeaders()
      });
      if (res.ok) {
        await fetchFullDatabase();
        setIsDraftDirty(true);
        showToast('success', 'Skill Removed');
        return true;
      }
      showToast('error', 'Delete Failed');
      return false;
    } catch (err: any) {
      showToast('error', 'Error', err.message);
      return false;
    } finally {
      setSaving(false);
    }
  };

  const saveCertificate = async (item: Partial<CertificateCmsItem>, isNew = false): Promise<boolean> => {
    try {
      setSaving(true);
      const method = isNew ? 'POST' : 'PUT';
      const endpoint = isNew ? '/api/cms/certificates' : `/api/cms/certificates/${item.id}`;
      const res = await fetch(endpoint, {
        method,
        headers: authHeaders(),
        body: JSON.stringify(item)
      });
      const json = await res.json();
      if (res.ok && json.success) {
        await fetchFullDatabase();
        setIsDraftDirty(true);
        showToast('success', isNew ? 'Certificate Added' : 'Certificate Updated');
        return true;
      }
      showToast('error', 'Save Failed', json.error);
      return false;
    } catch (err: any) {
      showToast('error', 'Error', err.message);
      return false;
    } finally {
      setSaving(false);
    }
  };

  const deleteCertificate = async (id: string): Promise<boolean> => {
    try {
      setSaving(true);
      const res = await fetch(`/api/cms/certificates/${id}`, {
        method: 'DELETE',
        headers: authHeaders()
      });
      if (res.ok) {
        await fetchFullDatabase();
        setIsDraftDirty(true);
        showToast('success', 'Certificate Removed');
        return true;
      }
      showToast('error', 'Delete Failed');
      return false;
    } catch (err: any) {
      showToast('error', 'Error', err.message);
      return false;
    } finally {
      setSaving(false);
    }
  };

  const saveProject = async (item: Partial<ProjectCmsItem>, isNew = false): Promise<boolean> => {
    try {
      setSaving(true);
      const method = isNew ? 'POST' : 'PUT';
      const endpoint = isNew ? '/api/cms/projects' : `/api/cms/projects/${item.id}`;
      const res = await fetch(endpoint, {
        method,
        headers: authHeaders(),
        body: JSON.stringify(item)
      });
      const json = await res.json();
      if (res.ok && json.success) {
        await fetchFullDatabase();
        setIsDraftDirty(true);
        showToast('success', isNew ? 'Project Added' : 'Project Updated');
        return true;
      }
      showToast('error', 'Save Failed', json.error);
      return false;
    } catch (err: any) {
      showToast('error', 'Error', err.message);
      return false;
    } finally {
      setSaving(false);
    }
  };

  const deleteProject = async (id: string): Promise<boolean> => {
    try {
      setSaving(true);
      const res = await fetch(`/api/cms/projects/${id}`, {
        method: 'DELETE',
        headers: authHeaders()
      });
      if (res.ok) {
        await fetchFullDatabase();
        setIsDraftDirty(true);
        showToast('success', 'Project Removed');
        return true;
      }
      showToast('error', 'Delete Failed');
      return false;
    } catch (err: any) {
      showToast('error', 'Error', err.message);
      return false;
    } finally {
      setSaving(false);
    }
  };

  const saveService = async (item: Partial<ServiceCmsItem>, isNew = false): Promise<boolean> => {
    try {
      setSaving(true);
      const method = isNew ? 'POST' : 'PUT';
      const endpoint = isNew ? '/api/cms/services' : `/api/cms/services/${item.id}`;
      const res = await fetch(endpoint, {
        method,
        headers: authHeaders(),
        body: JSON.stringify(item)
      });
      const json = await res.json();
      if (res.ok && json.success) {
        await fetchFullDatabase();
        setIsDraftDirty(true);
        showToast('success', isNew ? 'Service Added' : 'Service Updated');
        return true;
      }
      showToast('error', 'Save Failed', json.error);
      return false;
    } catch (err: any) {
      showToast('error', 'Error', err.message);
      return false;
    } finally {
      setSaving(false);
    }
  };

  const deleteService = async (id: string): Promise<boolean> => {
    try {
      setSaving(true);
      const res = await fetch(`/api/cms/services/${id}`, {
        method: 'DELETE',
        headers: authHeaders()
      });
      if (res.ok) {
        await fetchFullDatabase();
        setIsDraftDirty(true);
        showToast('success', 'Service Removed');
        return true;
      }
      showToast('error', 'Delete Failed');
      return false;
    } catch (err: any) {
      showToast('error', 'Error', err.message);
      return false;
    } finally {
      setSaving(false);
    }
  };

  const saveAchievement = async (item: Partial<AchievementCmsItem>, isNew = false): Promise<boolean> => {
    try {
      setSaving(true);
      const method = isNew ? 'POST' : 'PUT';
      const endpoint = isNew ? '/api/cms/achievements' : `/api/cms/achievements/${item.id}`;
      const res = await fetch(endpoint, {
        method,
        headers: authHeaders(),
        body: JSON.stringify(item)
      });
      const json = await res.json();
      if (res.ok && json.success) {
        await fetchFullDatabase();
        setIsDraftDirty(true);
        showToast('success', isNew ? 'Achievement Added' : 'Achievement Updated');
        return true;
      }
      showToast('error', 'Save Failed', json.error);
      return false;
    } catch (err: any) {
      showToast('error', 'Error', err.message);
      return false;
    } finally {
      setSaving(false);
    }
  };

  const deleteAchievement = async (id: string): Promise<boolean> => {
    try {
      setSaving(true);
      const res = await fetch(`/api/cms/achievements/${id}`, {
        method: 'DELETE',
        headers: authHeaders()
      });
      if (res.ok) {
        await fetchFullDatabase();
        setIsDraftDirty(true);
        showToast('success', 'Achievement Removed');
        return true;
      }
      showToast('error', 'Delete Failed');
      return false;
    } catch (err: any) {
      showToast('error', 'Error', err.message);
      return false;
    } finally {
      setSaving(false);
    }
  };

  const saveTestimonial = async (item: Partial<TestimonialCmsItem>, isNew = false): Promise<boolean> => {
    try {
      setSaving(true);
      const method = isNew ? 'POST' : 'PUT';
      const endpoint = isNew ? '/api/cms/testimonials' : `/api/cms/testimonials/${item.id}`;
      const res = await fetch(endpoint, {
        method,
        headers: authHeaders(),
        body: JSON.stringify(item)
      });
      const json = await res.json();
      if (res.ok && json.success) {
        await fetchFullDatabase();
        setIsDraftDirty(true);
        showToast('success', isNew ? 'Testimonial Added' : 'Testimonial Updated');
        return true;
      }
      showToast('error', 'Save Failed', json.error);
      return false;
    } catch (err: any) {
      showToast('error', 'Error', err.message);
      return false;
    } finally {
      setSaving(false);
    }
  };

  const deleteTestimonial = async (id: string): Promise<boolean> => {
    try {
      setSaving(true);
      const res = await fetch(`/api/cms/testimonials/${id}`, {
        method: 'DELETE',
        headers: authHeaders()
      });
      if (res.ok) {
        await fetchFullDatabase();
        setIsDraftDirty(true);
        showToast('success', 'Testimonial Removed');
        return true;
      }
      showToast('error', 'Delete Failed');
      return false;
    } catch (err: any) {
      showToast('error', 'Error', err.message);
      return false;
    } finally {
      setSaving(false);
    }
  };

  const saveSocialLink = async (item: Partial<SocialLinkCmsItem>, isNew = false): Promise<boolean> => {
    try {
      setSaving(true);
      const method = isNew ? 'POST' : 'PUT';
      const endpoint = isNew ? '/api/cms/social' : `/api/cms/social/${item.id}`;
      const res = await fetch(endpoint, {
        method,
        headers: authHeaders(),
        body: JSON.stringify(item)
      });
      const json = await res.json();
      if (res.ok && json.success) {
        await fetchFullDatabase();
        setIsDraftDirty(true);
        showToast('success', isNew ? 'Social Link Added' : 'Social Link Updated');
        return true;
      }
      showToast('error', 'Save Failed', json.error);
      return false;
    } catch (err: any) {
      showToast('error', 'Error', err.message);
      return false;
    } finally {
      setSaving(false);
    }
  };

  const deleteSocialLink = async (id: string): Promise<boolean> => {
    try {
      setSaving(true);
      const res = await fetch(`/api/cms/social/${id}`, {
        method: 'DELETE',
        headers: authHeaders()
      });
      if (res.ok) {
        await fetchFullDatabase();
        setIsDraftDirty(true);
        showToast('success', 'Social Link Removed');
        return true;
      }
      showToast('error', 'Delete Failed');
      return false;
    } catch (err: any) {
      showToast('error', 'Error', err.message);
      return false;
    } finally {
      setSaving(false);
    }
  };

  const saveNavigationItem = async (item: Partial<NavCmsItem>, isNew = false): Promise<boolean> => {
    try {
      setSaving(true);
      const method = isNew ? 'POST' : 'PUT';
      const endpoint = isNew ? '/api/cms/navigation' : `/api/cms/navigation/${item.id}`;
      const res = await fetch(endpoint, {
        method,
        headers: authHeaders(),
        body: JSON.stringify(item)
      });
      const json = await res.json();
      if (res.ok && json.success) {
        await fetchFullDatabase();
        setIsDraftDirty(true);
        showToast('success', isNew ? 'Navigation Item Added' : 'Navigation Item Updated');
        return true;
      }
      showToast('error', 'Save Failed', json.error);
      return false;
    } catch (err: any) {
      showToast('error', 'Error', err.message);
      return false;
    } finally {
      setSaving(false);
    }
  };

  const deleteNavigationItem = async (id: string): Promise<boolean> => {
    try {
      setSaving(true);
      const res = await fetch(`/api/cms/navigation/${id}`, {
        method: 'DELETE',
        headers: authHeaders()
      });
      if (res.ok) {
        await fetchFullDatabase();
        setIsDraftDirty(true);
        showToast('success', 'Navigation Item Removed');
        return true;
      }
      showToast('error', 'Delete Failed');
      return false;
    } catch (err: any) {
      showToast('error', 'Error', err.message);
      return false;
    } finally {
      setSaving(false);
    }
  };

  // Media
  const uploadMedia = async (fileName: string, fileType: string, base64Data: string): Promise<MediaItem | null> => {
    try {
      setSaving(true);
      const res = await fetch('/api/cms/media/upload', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ fileName, fileType, base64Data })
      });
      const json = await res.json();
      if (res.ok && json.success && json.data) {
        await fetchFullDatabase();
        showToast('success', 'File Uploaded', `${fileName} added to Media Library.`);
        return json.data;
      }
      showToast('error', 'Upload Failed', json.error || 'Failed to upload media file.');
      return null;
    } catch (err: any) {
      showToast('error', 'Upload Error', err.message);
      return null;
    } finally {
      setSaving(false);
    }
  };

  const deleteMedia = async (id: string): Promise<boolean> => {
    try {
      setSaving(true);
      const res = await fetch(`/api/cms/media/${id}`, {
        method: 'DELETE',
        headers: authHeaders()
      });
      if (res.ok) {
        await fetchFullDatabase();
        showToast('success', 'Media File Removed');
        return true;
      }
      showToast('error', 'Delete Failed');
      return false;
    } catch (err: any) {
      showToast('error', 'Error', err.message);
      return false;
    } finally {
      setSaving(false);
    }
  };

  const fetchActivityLogs = async (): Promise<ActivityLog[]> => {
    try {
      const res = await fetch('/api/cms/activity-logs', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const json = await res.json();
        return json.data || [];
      }
    } catch {
      // ignore
    }
    return [];
  };

  return (
    <AdminCmsContext.Provider
      value={{
        db,
        loading,
        saving,
        isDraftDirty,
        toasts,
        showToast,
        removeToast,
        fetchFullDatabase,
        publishAllChanges,
        resetToDefaults,
        updatePersonalInfo,
        updateHero,
        updateAbout,
        updateContact,
        updateSeo,
        updateSiteSettings,
        saveEducation,
        deleteEducation,
        saveExperience,
        deleteExperience,
        saveSkill,
        deleteSkill,
        saveCertificate,
        deleteCertificate,
        saveProject,
        deleteProject,
        saveService,
        deleteService,
        saveAchievement,
        deleteAchievement,
        saveTestimonial,
        deleteTestimonial,
        saveSocialLink,
        deleteSocialLink,
        saveNavigationItem,
        deleteNavigationItem,
        uploadMedia,
        deleteMedia,
        fetchActivityLogs
      }}
    >
      {children}
    </AdminCmsContext.Provider>
  );
}

export function useAdminCms(): AdminCmsContextValue {
  const ctx = useContext(AdminCmsContext);
  if (!ctx) {
    throw new Error('useAdminCms must be used within an AdminCmsProvider');
  }
  return ctx;
}
