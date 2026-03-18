/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Dataset {
  id: string;
  title: string;
  description: string;
  contactCount: number;
  industry: string;
  category: string;
  location: string;
  country: string;
  companySize: string;
  price: number;
  fields: string[];
  lastUpdated: string;
  link?: string;
}

export interface Category {
  id: string;
  name: string;
  datasetCount: number;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}
