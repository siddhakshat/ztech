// LeadOps - Style Guide Component

import React from 'react';
import { designTokens } from '../lib/designTokens';

export const StyleGuide: React.FC = () => {
  const { colors, borderRadius, spacing } = designTokens;

  return (
    <div className="rounded-lg border border-border_subtle overflow-hidden bg-muted/30">
      <div className="p-4 bg-muted/50 border-b border-border_subtle">
        <h3 className="text-lg font-semibold text-foreground">Style Guide</h3>
      </div>

      <div className="p-4 space-y-6">
        {/* Color Tokens */}
        <section>
          <h4 className="text-sm font-medium text-foreground mb-3">Color Tokens</h4>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(colors).map(([name, value]) => {
              const color = value as string;
              return (
                <div
                  key={name}
                  className="group relative rounded-lg p-3 hover:bg-muted/30 transition-colors cursor-pointer border border-border_subtle"
                >
                  <div
                    className="w-full h-16 rounded-md mb-2"
                    style={{ backgroundColor: color }}
                  />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted capitalize font-medium">{name}</span>
                    <span className="font-mono text-muted opacity-0 group-hover:opacity-100 transition-opacity">
                      {color}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Spacing Tokens */}
        <section>
          <h4 className="text-sm font-medium text-foreground mb-3">Spacing Tokens</h4>
          <div className="space-y-2">
            {(Object.keys(spacing) as Array<keyof typeof spacing>).map((key) => (
              <div
                key={key}
                className="flex items-center gap-3 group cursor-pointer p-2 rounded hover:bg-muted/30 border border-border_subtle"
              >
                <div
                  className="w-16 h-16 bg-accent_neon/5 rounded-lg"
                  style={{ padding: spacing[key] }}
                />
                <div className="flex-1">
                  <span className="text-sm font-medium text-foreground">{key}</span>
                  <span className="text-xs text-muted ml-2">
                    {spacing[key]}px
                  </span>
                </div>
                <span
                  className="font-mono text-xs text-muted opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    padding: spacing[key],
                    backgroundColor: 'var(--border_subtle)',
                    borderRadius: '4px',
                  }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Border Radius */}
        <section>
          <h4 className="text-sm font-medium text-foreground mb-3">Border Radius</h4>
          <div className="grid grid-cols-3 gap-4">
            {(Object.keys(borderRadius) as Array<keyof typeof borderRadius>).map((key) => (
              <div
                key={key}
                className="group cursor-pointer p-2 rounded hover:bg-muted/30 border border-border_subtle text-center"
              >
                <div
                  className="w-12 h-12 bg-accent_neon/10 rounded"
                  style={{ borderRadius: borderRadius[key] }}
                />
                <span className="text-xs text-muted mt-2 block">{key}</span>
                <span className="text-xs font-mono text-muted">{borderRadius[key]}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section>
          <h4 className="text-sm font-medium text-foreground mb-3">Typography Scale</h4>
          <div className="space-y-1">
            {[
              { size: '2rem', weight: '700', content: 'Display Title' },
              { size: '1.5rem', weight: '600', content: 'Section Heading' },
              { size: '1.25rem', weight: '600', content: 'Card Title' },
              { size: '1rem', weight: '500', content: 'Body Text' },
              { size: '0.875rem', weight: '500', content: 'Label' },
              { size: '0.8rem', weight: '400', content: 'Caption' },
            ].map((item) => (
              <div
                key={item.size}
                className="flex items-center justify-between p-2 hover:bg-muted/30 rounded border border-border_subtle"
              >
                <span
                  className={`text-foreground ${item.weight === '700' ? 'font-bold' : item.weight === '600' ? 'font-semibold' : item.weight === '500' ? 'font-medium' : 'font-normal'}`}
                  style={{ fontSize: item.size }}
                >
                  {item.content}
                </span>
                <span className="text-xs text-muted font-mono">{item.size}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};