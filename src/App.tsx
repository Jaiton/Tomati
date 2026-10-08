/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ClaudeWowPreview } from './components/ClaudeWowPreview';

export default function App() {
  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#1E2420] flex flex-col font-sans selection:bg-[#D44A22]/20 selection:text-[#1F3E29]">
      <ClaudeWowPreview />
    </div>
  );
}

