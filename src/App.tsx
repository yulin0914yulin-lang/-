/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Users, 
  BookOpen, 
  GitBranch, 
  FileText, 
  DollarSign, 
  UserCircle, 
  LayoutGrid, 
  Search, 
  Download, 
  RotateCcw, 
  ChevronRight, 
  ChevronDown,
  PlusSquare,
  MinusSquare,
  Briefcase,
  Gift,
  UserPlus,
  UserMinus,
  PieChart,
  Calendar,
  BarChart2,
  FileBarChart,
  Layers,
  X,
  CalendarRange,
  Activity,
  History,
  Trello
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
interface TableRow {
  id: string;
  dept1: string;
  dept2?: string;
  dept3?: string;
  budgetHc: number;
  budgetHcYoY: string;
  actualHc: number;
  actualHcYoY: string;
  rate: string;
  
  // 人工成本
  laborCostBudget: number;
  laborCostBudgetYoY: string;
  laborCostActual: number;
  laborCostActualYoY: string;
  laborCostExecution: string;
  
  // 人工成本（战略）
  laborCostStratBudget: number;
  laborCostStratActual: number;
  
  // 折合人数
  fteBudget: number;
  fteActual: number;
  
  // 人均人工成本
  avgLaborCostBudget: number;
  avgLaborCostActual: number;
  
  // 营收
  revenueBudget: number;
  revenueActual: number;
  
  // 毛利
  grossProfitBudget: number;
  grossProfitActual: number;
  
  // EBIT
  ebitBudget: number;
  ebitActual: number;
  
  // 人均
  avgRevBudget: number;
  avgRevActual: number;
  avgGpBudget: number;
  avgGpActual: number;
  avgEbitBudget: number;
  avgEbitActual: number;
  
  // 元均
  unitRevBudget: number;
  unitRevActual: number;
  unitGpBudget: number;
  unitGpActual: number;
  unitEbitBudget: number;
  unitEbitActual: number;

  budgetCost: number; // legacy
  actualCost: number; // legacy
  executionRate: string; // legacy
  budgetFte: number; // legacy
  actualFte: number; // legacy
  avgBudgetCost: number; // legacy
  avgActualCost: number; // legacy
  children?: TableRow[];
}

// --- Mock Data ---
const INITIAL_DATA: TableRow[] = [
  { 
    id: '1', dept1: '中国业务大区', budgetHc: 156, budgetHcYoY: '5.2%', actualHc: 148, actualHcYoY: '3.1%', rate: '94.8%', 
    laborCostBudget: 28080000, laborCostBudgetYoY: '4.8%', laborCostActual: 27500000, laborCostActualYoY: '4.2%', laborCostExecution: '97.9%',
    laborCostStratBudget: 5000000, laborCostStratActual: 4800000,
    fteBudget: 156, fteActual: 148,
    avgLaborCostBudget: 180000, avgLaborCostActual: 185810,
    revenueBudget: 500000000, revenueActual: 480000000,
    grossProfitBudget: 100000000, grossProfitActual: 95000000,
    ebitBudget: 50000000, ebitActual: 48000000,
    avgRevBudget: 3205128, avgRevActual: 3243243,
    avgGpBudget: 641025, avgGpActual: 641891,
    avgEbitBudget: 320512, avgEbitActual: 324324,
    unitRevBudget: 17.8, unitRevActual: 17.4,
    unitGpBudget: 3.5, unitGpActual: 3.4,
    unitEbitBudget: 1.7, unitEbitActual: 1.7,
    budgetCost: 28080000, actualCost: 27500000, executionRate: '97.9%', budgetFte: 156, actualFte: 148, avgBudgetCost: 180000, avgActualCost: 185810,
    children: []
  },
  { 
    id: '2', dept1: '质量中心', budgetHc: 50, budgetHcYoY: '2.0%', actualHc: 46, actualHcYoY: '1.5%', rate: '92%', 
    laborCostBudget: 8500000, laborCostBudgetYoY: '3.0%', laborCostActual: 8150000, laborCostActualYoY: '2.8%', laborCostExecution: '95.8%',
    laborCostStratBudget: 1000000, laborCostStratActual: 950000,
    fteBudget: 50, fteActual: 46,
    avgLaborCostBudget: 170000, avgLaborCostActual: 177173,
    revenueBudget: 0, revenueActual: 0,
    grossProfitBudget: 0, grossProfitActual: 0,
    ebitBudget: 0, ebitActual: 0,
    avgRevBudget: 0, avgRevActual: 0,
    avgGpBudget: 0, avgGpActual: 0,
    avgEbitBudget: 0, avgEbitActual: 0,
    unitRevBudget: 0, unitRevActual: 0,
    unitGpBudget: 0, unitGpActual: 0,
    unitEbitBudget: 0, unitEbitActual: 0,
    budgetCost: 8500000, actualCost: 8150000, executionRate: '95.8%', budgetFte: 50, actualFte: 46, avgBudgetCost: 170000, avgActualCost: 177173,
    children: [
      { 
        id: '2-1', dept1: '质量中心', dept2: '研发质量部', budgetHc: 25, budgetHcYoY: '1.2%', actualHc: 23, actualHcYoY: '0.8%', rate: '92%', 
        laborCostBudget: 4500000, laborCostBudgetYoY: '2.5%', laborCostActual: 4350000, laborCostActualYoY: '2.2%', laborCostExecution: '96.6%',
        laborCostStratBudget: 500000, laborCostStratActual: 480000,
        fteBudget: 25, fteActual: 23,
        avgLaborCostBudget: 180000, avgLaborCostActual: 189130,
        revenueBudget: 0, revenueActual: 0,
        grossProfitBudget: 0, grossProfitActual: 0,
        ebitBudget: 0, ebitActual: 0,
        avgRevBudget: 0, avgRevActual: 0,
        avgGpBudget: 0, avgGpActual: 0,
        avgEbitBudget: 0, avgEbitActual: 0,
        unitRevBudget: 0, unitRevActual: 0,
        unitGpBudget: 0, unitGpActual: 0,
        unitEbitBudget: 0, unitEbitActual: 0,
        budgetCost: 4500000, actualCost: 4350000, executionRate: '96.6%', budgetFte: 25, actualFte: 23, avgBudgetCost: 180000, avgActualCost: 189130,
        children: [
          { id: '2-1-1', dept1: '质量中心', dept2: '研发质量部', dept3: '标准化组', budgetHc: 10, budgetHcYoY: '0%', actualHc: 9, actualHcYoY: '0%', rate: '90%', laborCostBudget: 1800000, laborCostBudgetYoY: '1%', laborCostActual: 1750000, laborCostActualYoY: '1%', laborCostExecution: '97.2%', laborCostStratBudget: 0, laborCostStratActual: 0, fteBudget: 10, fteActual: 9, avgLaborCostBudget: 180000, avgLaborCostActual: 194444, revenueBudget: 0, revenueActual: 0, grossProfitBudget: 0, grossProfitActual: 0, ebitBudget: 0, ebitActual: 0, avgRevBudget: 0, avgRevActual: 0, avgGpBudget: 0, avgGpActual: 0, avgEbitBudget: 0, avgEbitActual: 0, unitRevBudget: 0, unitRevActual: 0, unitGpBudget: 0, unitGpActual: 0, unitEbitBudget: 0, unitEbitActual: 0, budgetCost: 1800000, actualCost: 1750000, executionRate: '97.2%', budgetFte: 10, actualFte: 9, avgBudgetCost: 180000, avgActualCost: 194444 },
          { id: '2-1-2', dept1: '质量中心', dept2: '研发质量部', dept3: '实验室', budgetHc: 15, budgetHcYoY: '2%', actualHc: 14, actualHcYoY: '1%', rate: '93.3%', laborCostBudget: 2700000, laborCostBudgetYoY: '3%', laborCostActual: 2600000, laborCostActualYoY: '2%', laborCostExecution: '96.3%', laborCostStratBudget: 0, laborCostStratActual: 0, fteBudget: 15, fteActual: 14, avgLaborCostBudget: 180000, avgLaborCostActual: 185714, revenueBudget: 0, revenueActual: 0, grossProfitBudget: 0, grossProfitActual: 0, ebitBudget: 0, ebitActual: 0, avgRevBudget: 0, avgRevActual: 0, avgGpBudget: 0, avgGpActual: 0, avgEbitBudget: 0, avgEbitActual: 0, unitRevBudget: 0, unitRevActual: 0, unitGpBudget: 0, unitGpActual: 0, unitEbitBudget: 0, unitEbitActual: 0, budgetCost: 2700000, actualCost: 2600000, executionRate: '96.3%', budgetFte: 15, actualFte: 14, avgBudgetCost: 180000, avgActualCost: 185714 },
        ]
      },
      { id: '2-2', dept1: '质量中心', dept2: '制造质量部', budgetHc: 15, budgetHcYoY: '0%', actualHc: 14, actualHcYoY: '0%', rate: '93.3%', laborCostBudget: 2400000, laborCostBudgetYoY: '0%', laborCostActual: 2300000, laborCostActualYoY: '0%', laborCostExecution: '95.8%', laborCostStratBudget: 0, laborCostStratActual: 0, fteBudget: 15, fteActual: 14, avgLaborCostBudget: 160000, avgLaborCostActual: 164285, revenueBudget: 0, revenueActual: 0, grossProfitBudget: 0, grossProfitActual: 0, ebitBudget: 0, ebitActual: 0, avgRevBudget: 0, avgRevActual: 0, avgGpBudget: 0, avgGpActual: 0, avgEbitBudget: 0, avgEbitActual: 0, unitRevBudget: 0, unitRevActual: 0, unitGpBudget: 0, unitGpActual: 0, unitEbitBudget: 0, unitEbitActual: 0, budgetCost: 2400000, actualCost: 2300000, executionRate: '95.8%', budgetFte: 15, actualFte: 14, avgBudgetCost: 160000, avgActualCost: 164285 },
      { id: '2-3', dept1: '质量中心', dept2: '质量体系管理部', budgetHc: 10, budgetHcYoY: '0%', actualHc: 9, actualHcYoY: '0%', rate: '90%', laborCostBudget: 1600000, laborCostBudgetYoY: '0%', laborCostActual: 1500000, laborCostActualYoY: '0%', laborCostExecution: '93.7%', laborCostStratBudget: 0, laborCostStratActual: 0, fteBudget: 10, fteActual: 9, avgLaborCostBudget: 160000, avgLaborCostActual: 166666, revenueBudget: 0, revenueActual: 0, grossProfitBudget: 0, grossProfitActual: 0, ebitBudget: 0, ebitActual: 0, avgRevBudget: 0, avgRevActual: 0, avgGpBudget: 0, avgGpActual: 0, avgEbitBudget: 0, avgEbitActual: 0, unitRevBudget: 0, unitRevActual: 0, unitGpBudget: 0, unitGpActual: 0, unitEbitBudget: 0, unitEbitActual: 0, budgetCost: 1600000, actualCost: 1500000, executionRate: '93.7%', budgetFte: 10, actualFte: 9, avgBudgetCost: 160000, avgActualCost: 166666 },
    ]
  },
  { 
    id: '3', dept1: '研发中心', budgetHc: 420, budgetHcYoY: '8%', actualHc: 405, actualHcYoY: '6%', rate: '96.4%', laborCostBudget: 105000000, laborCostBudgetYoY: '10%', laborCostActual: 102400000, laborCostActualYoY: '9%', laborCostExecution: '97.5%', laborCostStratBudget: 20000000, laborCostStratActual: 19500000, fteBudget: 420, fteActual: 405, avgLaborCostBudget: 250000, avgLaborCostActual: 252839, revenueBudget: 800000000, revenueActual: 750000000, grossProfitBudget: 240000000, grossProfitActual: 220000000, ebitBudget: 120000000, ebitActual: 110000000, avgRevBudget: 1904761, avgRevActual: 1851851, avgGpBudget: 571428, avgGpActual: 543209, avgEbitBudget: 285714, avgEbitActual: 271604, unitRevBudget: 7.6, unitRevActual: 7.3, unitGpBudget: 2.2, unitGpActual: 2.1, unitEbitBudget: 1.1, unitEbitActual: 1.0, budgetCost: 105000000, actualCost: 102400000, executionRate: '97.5%', budgetFte: 420, actualFte: 405, avgBudgetCost: 250000, avgActualCost: 252839,
    children: []
  },
  { 
    id: '4', dept1: '亚太业务大区', budgetHc: 85, budgetHcYoY: '3%', actualHc: 82, actualHcYoY: '2%', rate: '96.5%', 
    laborCostBudget: 12750000, laborCostBudgetYoY: '4%', laborCostActual: 12500000, laborCostActualYoY: '3%', laborCostExecution: '98.0%',
    laborCostStratBudget: 1500000, laborCostStratActual: 1350000,
    fteBudget: 85, fteActual: 82,
    avgLaborCostBudget: 150000, avgLaborCostActual: 152439,
    revenueBudget: 200000000, revenueActual: 195000000,
    grossProfitBudget: 40000000, grossProfitActual: 38000000,
    ebitBudget: 20000000, ebitActual: 19000000,
    avgRevBudget: 2352941, avgRevActual: 2378048,
    avgGpBudget: 470588, avgGpActual: 463414,
    avgEbitBudget: 235294, avgEbitActual: 231707,
    unitRevBudget: 15.7, unitRevActual: 15.6,
    unitGpBudget: 3.1, unitGpActual: 3.0,
    unitEbitBudget: 1.6, unitEbitActual: 1.5,
    budgetCost: 12750000, actualCost: 12500000, executionRate: '98.0%', budgetFte: 85, actualFte: 82, avgBudgetCost: 150000, avgActualCost: 152439 
  },
  { 
    id: '5', dept1: '信息化中心', budgetHc: 60, budgetHcYoY: '5%', actualHc: 58, actualHcYoY: '4%', rate: '96.6%', 
    laborCostBudget: 13200000, laborCostBudgetYoY: '6%', laborCostActual: 12900000, laborCostActualYoY: '5%', laborCostExecution: '97.7%',
    laborCostStratBudget: 1200000, laborCostStratActual: 1150000,
    fteBudget: 60, fteActual: 58,
    avgLaborCostBudget: 220000, avgLaborCostActual: 222413,
    revenueBudget: 0, revenueActual: 0,
    grossProfitBudget: 0, grossProfitActual: 0,
    ebitBudget: 0, ebitActual: 0,
    avgRevBudget: 0, avgRevActual: 0,
    avgGpBudget: 0, avgGpActual: 0,
    avgEbitBudget: 0, avgEbitActual: 0,
    unitRevBudget: 0, unitRevActual: 0,
    unitGpBudget: 0, unitGpActual: 0,
    unitEbitBudget: 0, unitEbitActual: 0,
    budgetCost: 13200000, actualCost: 12900000, executionRate: '97.7%', budgetFte: 60, actualFte: 58, avgBudgetCost: 220000, avgActualCost: 222413 
  },
  { 
    id: '6', dept1: '小米海外业务中心', budgetHc: 120, budgetHcYoY: '4%', actualHc: 115, actualHcYoY: '3%', rate: '95.8%', 
    laborCostBudget: 24000000, laborCostBudgetYoY: '5%', laborCostActual: 23000000, laborCostActualYoY: '4%', laborCostExecution: '95.8%',
    laborCostStratBudget: 4000000, laborCostStratActual: 3800000,
    fteBudget: 120, fteActual: 115,
    avgLaborCostBudget: 200000, avgLaborCostActual: 200000,
    revenueBudget: 400000000, revenueActual: 380000000,
    grossProfitBudget: 80000000, grossProfitActual: 75000000,
    ebitBudget: 40000000, ebitActual: 38000000,
    avgRevBudget: 3333333, avgRevActual: 3304347,
    avgGpBudget: 666666, avgGpActual: 652173,
    avgEbitBudget: 333333, avgEbitActual: 330434,
    unitRevBudget: 16.6, unitRevActual: 16.5,
    unitGpBudget: 3.3, unitGpActual: 3.2,
    unitEbitBudget: 1.6, unitEbitActual: 1.6,
    budgetCost: 24000000, actualCost: 23000000, executionRate: '95.8%', budgetFte: 120, actualFte: 115, avgBudgetCost: 200000, avgActualCost: 200000 
  },
  { id: 'tail-1', dept1: '短交通价值链', budgetHc: 18, budgetHcYoY: '2%', actualHc: 17, actualHcYoY: '1%', rate: '94.4%', laborCostBudget: 10638476, laborCostBudgetYoY: '3%', laborCostActual: 10500000, laborCostActualYoY: '2%', laborCostExecution: '98.7%', laborCostStratBudget: 0, laborCostStratActual: 0, fteBudget: 18, fteActual: 17, avgLaborCostBudget: 591026, avgLaborCostActual: 617647, revenueBudget: 0, revenueActual: 0, grossProfitBudget: 0, grossProfitActual: 0, ebitBudget: 0, ebitActual: 0, avgRevBudget: 0, avgRevActual: 0, avgGpBudget: 0, avgGpActual: 0, avgEbitBudget: 0, avgEbitActual: 0, unitRevBudget: 0, unitRevActual: 0, unitGpBudget: 0, unitGpActual: 0, unitEbitBudget: 0, unitEbitActual: 0, budgetCost: 10638476, actualCost: 10500000, executionRate: '98.7%', budgetFte: 18, actualFte: 17, avgBudgetCost: 591026, avgActualCost: 617647 },
  { id: 'tail-electric', dept1: '电动价值链', budgetHc: 25, budgetHcYoY: '5%', actualHc: 24, actualHcYoY: '4%', rate: '96.0%', laborCostBudget: 15600000, laborCostBudgetYoY: '6%', laborCostActual: 15200000, laborCostActualYoY: '5%', laborCostExecution: '97.4%', laborCostStratBudget: 0, laborCostStratActual: 0, fteBudget: 25, fteActual: 24, avgLaborCostBudget: 624000, avgLaborCostActual: 633333, revenueBudget: 0, revenueActual: 0, grossProfitBudget: 0, grossProfitActual: 0, ebitBudget: 0, ebitActual: 0, avgRevBudget: 0, avgRevActual: 0, avgGpBudget: 0, avgGpActual: 0, avgEbitBudget: 0, avgEbitActual: 0, unitRevBudget: 0, unitRevActual: 0, unitGpBudget: 0, unitGpActual: 0, unitEbitBudget: 0, unitEbitActual: 0, budgetCost: 15600000, actualCost: 15200000, executionRate: '97.4%', budgetFte: 25, actualFte: 24, avgBudgetCost: 624000, avgActualCost: 633333 },
  { id: 'tail-2', dept1: '校招生', budgetHc: 54, budgetHcYoY: '0%', actualHc: 52, actualHcYoY: '0%', rate: '96.3%', laborCostBudget: 4860000, laborCostBudgetYoY: '0%', laborCostActual: 4700000, laborCostActualYoY: '0%', laborCostExecution: '96.7%', laborCostStratBudget: 0, laborCostStratActual: 0, fteBudget: 54, fteActual: 52, avgLaborCostBudget: 90000, avgLaborCostActual: 90384, revenueBudget: 0, revenueActual: 0, grossProfitBudget: 0, grossProfitActual: 0, ebitBudget: 0, ebitActual: 0, avgRevBudget: 0, avgRevActual: 0, avgGpBudget: 0, avgGpActual: 0, avgEbitBudget: 0, avgEbitActual: 0, unitRevBudget: 0, unitRevActual: 0, unitGpBudget: 0, unitGpActual: 0, unitEbitBudget: 0, unitEbitActual: 0, budgetCost: 4860000, actualCost: 4700000, executionRate: '96.7%', budgetFte: 54, actualFte: 52, avgBudgetCost: 90000, avgActualCost: 90384 },
  { id: 'tail-3', dept1: '管理公共', budgetHc: 12, budgetHcYoY: '/', actualHc: 11, actualHcYoY: '/', rate: '91.6%', laborCostBudget: 3600000, laborCostBudgetYoY: '/', laborCostActual: 3450000, laborCostActualYoY: '/', laborCostExecution: '95.8%', laborCostStratBudget: 0, laborCostStratActual: 0, fteBudget: 12, fteActual: 11, avgLaborCostBudget: 300000, avgLaborCostActual: 313636, revenueBudget: 0, revenueActual: 0, grossProfitBudget: 0, grossProfitActual: 0, ebitBudget: 0, ebitActual: 0, avgRevBudget: 0, avgRevActual: 0, avgGpBudget: 0, avgGpActual: 0, avgEbitBudget: 0, avgEbitActual: 0, unitRevBudget: 0, unitRevActual: 0, unitGpBudget: 0, unitGpActual: 0, unitEbitBudget: 0, unitEbitActual: 0, budgetCost: 3600000, actualCost: 3450000, executionRate: '95.8%', budgetFte: 12, actualFte: 11, avgBudgetCost: 300000, avgActualCost: 313636 },
  { id: 'tail-4', dept1: '残疾工', budgetHc: 5, budgetHcYoY: '/', actualHc: 5, actualHcYoY: '/', rate: '100%', laborCostBudget: 250000, laborCostBudgetYoY: '/', laborCostActual: 245000, laborCostActualYoY: '/', laborCostExecution: '98%', laborCostStratBudget: 0, laborCostStratActual: 0, fteBudget: 5, fteActual: 5, avgLaborCostBudget: 50000, avgLaborCostActual: 49000, revenueBudget: 0, revenueActual: 0, grossProfitBudget: 0, grossProfitActual: 0, ebitBudget: 0, ebitActual: 0, avgRevBudget: 0, avgRevActual: 0, avgGpBudget: 0, avgGpActual: 0, avgEbitBudget: 0, avgEbitActual: 0, unitRevBudget: 0, unitRevActual: 0, unitGpBudget: 0, unitGpActual: 0, unitEbitBudget: 0, unitEbitActual: 0, budgetCost: 250000, actualCost: 245000, executionRate: '98%', budgetFte: 5, actualFte: 5, avgBudgetCost: 50000, avgActualCost: 49000 },
  { id: 'tail-6', dept1: '整体合计', budgetHc: 105, budgetHcYoY: '/', actualHc: 102, actualHcYoY: '/', rate: '97.1%', laborCostBudget: 18552595, laborCostBudgetYoY: '/', laborCostActual: 18200000, laborCostActualYoY: '/', laborCostExecution: '98.1%', laborCostStratBudget: 0, laborCostStratActual: 0, fteBudget: 105, fteActual: 102, avgLaborCostBudget: 176691, avgLaborCostActual: 178431, revenueBudget: 0, revenueActual: 0, grossProfitBudget: 0, grossProfitActual: 0, ebitBudget: 0, ebitActual: 0, avgRevBudget: 0, avgRevActual: 0, avgGpBudget: 0, avgGpActual: 0, avgEbitBudget: 0, avgEbitActual: 0, unitRevBudget: 0, unitRevActual: 0, unitGpBudget: 0, unitGpActual: 0, unitEbitBudget: 0, unitEbitActual: 0, budgetCost: 18552595, actualCost: 18200000, executionRate: '98.1%', budgetFte: 105, actualFte: 102, avgBudgetCost: 176691, avgActualCost: 178431 },
];

// --- Row Render Component ---
const RowRender: React.FC<{
  row: TableRow;
  level?: number;
  expandedRows: string[];
  toggleExpand: (id: string) => void;
  activeSubMenu: string;
}> = ({ 
  row, 
  level = 1, 
  expandedRows, 
  toggleExpand,
  activeSubMenu
}) => {
  const isExpanded = expandedRows.includes(row.id);
  const hasChildren = row.children && row.children.length > 0;
  const isMonthlyActual = activeSubMenu === '预实分析报表-月度实际';
  const isQuarterly = activeSubMenu.includes('季度');
  const isBold = ['短交通价值链', '电动价值链', '校招生', '管理公共', '残疾工', '整体合计'].includes(row.dept1);

  return (
    <>
      <tr className={`group hover:bg-gray-50 transition-colors ${level > 1 ? 'bg-[#fcfcfc]' : 'bg-white'}`}>
        {/* Column 1: 一级部门 (Always shows row.dept1) */}
        <td className={`px-4 py-3 h-12 border-r border-b border-gray-100 min-w-0 sticky left-0 z-10 ${level > 1 ? 'bg-[#fcfcfc]' : 'bg-white'} group-hover:bg-gray-50 transition-colors`}>
          <div className="flex items-center gap-2 overflow-hidden">
            {level === 1 ? (
              <>
                {!isQuarterly && (
                  hasChildren ? (
                    <button onClick={() => toggleExpand(row.id)} className="text-gray-400 hover:text-gray-600 shrink-0">
                      {isExpanded ? <MinusSquare size={16} /> : <PlusSquare size={16} />}
                    </button>
                  ) : (
                    row.id.startsWith('tail-') ? (
                      <div className="w-4 shrink-0" />
                    ) : (
                      <div className="w-4 shrink-0 flex items-center justify-center text-gray-300 opacity-50">
                        <PlusSquare size={16} />
                      </div>
                    )
                  )
                )}
                <span className={`truncate block ${isBold ? 'font-bold text-gray-900' : 'text-gray-800 font-medium'}`} title={row.dept1}>{row.dept1}</span>
              </>
            ) : (
              <span className="text-gray-400 text-xs ml-6 truncate block" title={row.dept1}>{row.dept1}</span>
            )}
          </div>
        </td>

        {!isQuarterly && (
          <>
            {/* Column 2: 二级部门 */}
            <td className={`px-4 py-3 h-12 border-r border-b border-gray-100 min-w-0 sticky left-[150px] z-10 ${level > 1 ? 'bg-[#fcfcfc]' : 'bg-white'} group-hover:bg-gray-50 transition-colors`}>
              <div className="flex items-center gap-2 overflow-hidden">
                {level === 2 ? (
                  <>
                    <button onClick={() => toggleExpand(row.id)} className="text-gray-400 hover:text-gray-600 shrink-0">
                      {hasChildren ? (isExpanded ? <MinusSquare size={16} /> : <PlusSquare size={16} />) : <PlusSquare size={16} className="opacity-20" />}
                    </button>
                    <span className="text-gray-700 truncate block" title={row.dept2}>{row.dept2}</span>
                  </>
                ) : level === 3 ? (
                  <span className="text-gray-400 text-xs ml-6 truncate block" title={row.dept2}>{row.dept2}</span>
                ) : null}
              </div>
            </td>

            {/* Column 3: 三级部门 */}
            <td className={`px-4 py-3 h-12 border-r border-b border-gray-100 min-w-0 sticky left-[300px] z-10 ${level > 1 ? 'bg-[#fcfcfc]' : 'bg-white'} group-hover:bg-gray-50 transition-colors`}>
              <div className="flex items-center gap-2 overflow-hidden">
                {level === 3 && (
                  <>
                    <div className="w-4 shrink-0" />
                    <span className="text-gray-700 truncate block" title={row.dept3}>{row.dept3}</span>
                  </>
                )}
              </div>
            </td>
          </>
        )}

        {/* HC Columns (Standard Month/Year) */}
        {!isMonthlyActual && activeSubMenu !== '预实分析报表-月度累计' && !isQuarterly && (
          <td className="px-2 py-3 h-12 text-center border-r border-b border-gray-100 font-mono min-w-[100px] text-gray-600">{row.budgetHc}</td>
        )}
        {activeSubMenu !== '预实分析报表-月度累计' && !isQuarterly && (
          <td className="px-2 py-3 h-12 text-center border-r border-b border-gray-100 font-mono min-w-[100px] text-gray-600">{row.actualHc}</td>
        )}
        {!isMonthlyActual && activeSubMenu !== '预实分析报表-月度累计' && !isQuarterly && (
          <td className="px-2 py-3 h-12 text-center border-r border-b border-gray-100 font-mono min-w-[100px] text-gray-600">{row.rate}</td>
        )}
        
        {/* Cost Columns (Standard Month/Year) */}
        {!isMonthlyActual && activeSubMenu !== '预实分析报表-月度累计' && !isQuarterly && (
          <td className="px-2 py-3 h-12 text-center border-r border-b border-gray-100 font-mono min-w-[140px] text-gray-600">{row.budgetCost}</td>
        )}
        {activeSubMenu !== '预实分析报表-月度累计' && !isQuarterly && (
          <td className="px-2 py-3 h-12 text-center border-r border-b border-gray-100 font-mono min-w-[140px] text-gray-600">{row.actualCost}</td>
        )}
        {!isMonthlyActual && activeSubMenu !== '预实分析报表-月度累计' && !isQuarterly && (
          <td className="px-2 py-3 h-12 text-center border-r border-b border-gray-100 font-mono min-w-[100px] text-gray-600">{row.executionRate}</td>
        )}
        
        {/* FTE Columns (Standard Month/Year) */}
        {!isMonthlyActual && activeSubMenu !== '预实分析报表-月度累计' && !isQuarterly && (
          <td className="px-2 py-3 h-12 text-center border-r border-b border-gray-100 font-mono min-w-[120px] text-gray-600">{row.budgetFte}</td>
        )}
        {activeSubMenu !== '预实分析报表-月度累计' && !isQuarterly && (
          <td className="px-2 py-3 h-12 text-center border-r border-b border-gray-100 font-mono min-w-[120px] text-gray-600">{row.actualFte}</td>
        )}
        
        {/* Avg Cost Columns (Standard Month/Year) */}
        {!isMonthlyActual && activeSubMenu !== '预实分析报表-月度累计' && !isQuarterly && (
          <td className="px-2 py-3 h-12 text-center border-r border-b border-gray-100 font-mono min-w-[160px] text-gray-600">{row.avgBudgetCost}</td>
        )}
        {activeSubMenu !== '预实分析报表-月度累计' && !isQuarterly && (
          <td className="px-2 py-3 h-12 text-center border-r border-b border-gray-100 font-mono min-w-[160px] text-gray-600">{row.avgActualCost}</td>
        )}

        {/* --- Quarterly specific columns --- */}
        {isQuarterly && (
          <>
            <td className="px-2 py-3 h-12 text-center border-r border-b border-gray-100 font-mono min-w-[100px] text-gray-600">{row.budgetHc}</td>
            <td className="px-2 py-3 h-12 text-center border-r border-b border-gray-100 font-mono min-w-[140px] text-gray-600">{row.actualHc}</td>
            <td className="px-2 py-3 h-12 text-center border-r border-b border-gray-100 font-mono min-w-[100px] text-gray-600">{row.rate}</td>
            
            <td className="px-2 py-3 h-12 text-center border-r border-b border-gray-100 font-mono min-w-[140px] text-gray-600">{(row.laborCostBudget/10000).toFixed(0)}</td>
            <td className="px-2 py-3 h-12 text-center border-r border-b border-gray-100 font-mono min-w-[140px] text-gray-600">{(row.laborCostActual/10000).toFixed(0)}</td>
            <td className="px-2 py-3 h-12 text-center border-r border-b border-gray-100 font-mono min-w-[100px] text-gray-600">{row.laborCostExecution}</td>
            
            <td className="px-2 py-3 h-12 text-center border-r border-b border-gray-100 font-mono min-w-[120px] text-gray-600">{row.fteBudget}</td>
            <td className="px-2 py-3 h-12 text-center border-r border-b border-gray-100 font-mono min-w-[120px] text-gray-600">{row.fteActual}</td>
            
            <td className="px-2 py-3 h-12 text-center border-r border-b border-gray-100 font-mono min-w-[160px] text-gray-600">{(row.avgLaborCostBudget/10000).toFixed(1)}</td>
            <td className="px-2 py-3 h-12 text-center border-r border-b border-gray-100 font-mono min-w-[160px] text-gray-600">{(row.avgLaborCostActual/10000).toFixed(1)}</td>
          </>
        )}


        {/* --- Monthly Cumulative Special Columns (HC, Labor, Strategic, etc.) --- */}
        {activeSubMenu === '预实分析报表-月度累计' && (
          <>
            <td className="px-2 py-3 h-12 text-center border-r border-b border-gray-100 font-mono min-w-[100px] text-gray-600">{row.budgetHc}</td>
            <td className="px-2 py-3 h-12 text-center border-r border-b border-gray-100 font-mono min-w-[110px] text-gray-600">{row.budgetHcYoY}</td>
            <td className="px-2 py-3 h-12 text-center border-r border-b border-gray-100 font-mono min-w-[100px] text-gray-600">{row.actualHc}</td>
            <td className="px-2 py-3 h-12 text-center border-r border-b border-gray-100 font-mono min-w-[110px] text-gray-600">{row.actualHcYoY}</td>
            <td className="px-2 py-3 h-12 text-center border-r border-b border-gray-100 font-mono min-w-[100px] text-gray-600">{row.rate}</td>
            
            <td className="px-2 py-3 h-12 text-center border-r border-b border-gray-100 font-mono min-w-[140px] text-gray-600">{(row.laborCostBudget/10000).toFixed(0)}</td>
            <td className="px-2 py-3 h-12 text-center border-r border-b border-gray-100 font-mono min-w-[110px] text-gray-600">{row.laborCostBudgetYoY}</td>
            <td className="px-2 py-3 h-12 text-center border-r border-b border-gray-100 font-mono min-w-[140px] text-gray-600">{(row.laborCostActual/10000).toFixed(0)}</td>
            <td className="px-2 py-3 h-12 text-center border-r border-b border-gray-100 font-mono min-w-[110px] text-gray-600">{row.laborCostActualYoY}</td>
            <td className="px-2 py-3 h-12 text-center border-r border-b border-gray-100 font-mono min-w-[100px] text-gray-600">{row.laborCostExecution}</td>

            <td className="px-2 py-3 h-12 text-center border-r border-b border-gray-100 font-mono min-w-[150px] text-gray-600">{(row.laborCostStratBudget/10000).toFixed(0)}</td>
            <td className="px-2 py-3 h-12 text-center border-r border-b border-gray-100 font-mono min-w-[150px] text-gray-600">{(row.laborCostStratActual/10000).toFixed(0)}</td>

            <td className="px-2 py-3 h-12 text-center border-r border-b border-gray-100 font-mono min-w-[120px] text-gray-600">{row.fteBudget}</td>
            <td className="px-2 py-3 h-12 text-center border-r border-b border-gray-100 font-mono min-w-[120px] text-gray-600">{row.fteActual}</td>

            <td className="px-2 py-3 h-12 text-center border-r border-b border-gray-100 font-mono min-w-[160px] text-gray-600">{(row.avgLaborCostBudget/10000).toFixed(1)}</td>
            <td className="px-2 py-3 h-12 text-center border-r border-b border-gray-100 font-mono min-w-[160px] text-gray-600">{(row.avgLaborCostActual/10000).toFixed(1)}</td>
          </>
        )}

        {/* --- Shared Financial Columns (Monthly Cumulative & Quarterly) --- */}
        {(activeSubMenu === '预实分析报表-月度累计' || isQuarterly) && (
          <>
            <td className="px-2 py-3 h-12 text-center border-r border-b border-gray-100 font-mono min-w-[160px] text-gray-600">{(row.revenueBudget/10000).toFixed(0)}</td>
            <td className="px-2 py-3 h-12 text-center border-r border-b border-gray-100 font-mono min-w-[160px] text-gray-600">{(row.revenueActual/10000).toFixed(0)}</td>

            <td className="px-2 py-3 h-12 text-center border-r border-b border-gray-100 font-mono min-w-[160px] text-gray-600">{(row.grossProfitBudget/10000).toFixed(0)}</td>
            <td className="px-2 py-3 h-12 text-center border-r border-b border-gray-100 font-mono min-w-[160px] text-gray-600">{(row.grossProfitActual/10000).toFixed(0)}</td>

            <td className="px-2 py-3 h-12 text-center border-r border-b border-gray-100 font-mono min-w-[160px] text-gray-600">{(row.ebitBudget/10000).toFixed(0)}</td>
            <td className="px-2 py-3 h-12 text-center border-r border-b border-gray-100 font-mono min-w-[160px] text-gray-600">{(row.ebitActual/10000).toFixed(0)}</td>

            <td className="px-2 py-3 h-12 text-center border-r border-b border-gray-100 font-mono min-w-[160px] text-gray-600">{(row.avgRevBudget/10000).toFixed(0)}</td>
            <td className="px-2 py-3 h-12 text-center border-r border-b border-gray-100 font-mono min-w-[160px] text-gray-600">{(row.avgRevActual/10000).toFixed(0)}</td>

            <td className="px-2 py-3 h-12 text-center border-r border-b border-gray-100 font-mono min-w-[160px] text-gray-600">{(row.avgGpBudget/10000).toFixed(0)}</td>
            <td className="px-2 py-3 h-12 text-center border-r border-b border-gray-100 font-mono min-w-[160px] text-gray-600">{(row.avgGpActual/10000).toFixed(0)}</td>

            <td className="px-2 py-3 h-12 text-center border-r border-b border-gray-100 font-mono min-w-[160px] text-gray-600">{(row.avgEbitBudget/10000).toFixed(0)}</td>
            <td className="px-2 py-3 h-12 text-center border-r border-b border-gray-100 font-mono min-w-[160px] text-gray-600">{(row.avgEbitActual/10000).toFixed(0)}</td>

            <td className="px-2 py-3 h-12 text-center border-r border-b border-gray-100 font-mono min-w-[150px] text-gray-600">{row.unitRevBudget}</td>
            <td className="px-2 py-3 h-12 text-center border-r border-b border-gray-100 font-mono min-w-[150px] text-gray-600">{row.unitRevActual}</td>

            <td className="px-2 py-3 h-12 text-center border-r border-b border-gray-100 font-mono min-w-[150px] text-gray-600">{row.unitGpBudget}</td>
            <td className="px-2 py-3 h-12 text-center border-r border-b border-gray-100 font-mono min-w-[150px] text-gray-600">{row.unitGpActual}</td>

            <td className="px-2 py-3 h-12 text-center border-r border-b border-gray-100 font-mono min-w-[150px] text-gray-600">{row.unitEbitBudget}</td>
            <td className="px-2 py-3 h-12 text-center border-r border-b border-gray-100 font-mono min-w-[150px] text-gray-600">{row.unitEbitActual}</td>
          </>
        )}

      </tr>

      {/* Recursive Children Rendering */}
      {!isQuarterly && isExpanded && row.children?.map(child => (
        <RowRender 
          key={child.id} 
          row={child} 
          level={level + 1} 
          expandedRows={expandedRows} 
          toggleExpand={toggleExpand} 
          activeSubMenu={activeSubMenu}
        />
      ))}
    </>
  );
};

export default function App() {
  const [expandedRows, setExpandedRows] = useState<string[]>(['2', '2-1', '6']);
  const [activeMenu, setActiveMenu] = useState('预算管理');
  const [activeSubMenu, setActiveSubMenu] = useState('预实分析报表-月度实际');
  const [budgetDate, setBudgetDate] = useState('');
  const [actualDate, setActualDate] = useState('');
  const [budgetYear, setBudgetYear] = useState('');
  const [selectedQuarter, setSelectedQuarter] = useState('');
  const [selectedExpenseTypes, setSelectedExpenseTypes] = useState<string[]>([]);
  const [isExpenseTypeOpen, setIsExpenseTypeOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const budgetDateRef = useRef<HTMLInputElement>(null);
  const actualDateRef = useRef<HTMLInputElement>(null);

  const expenseTypes = ["管理", "销售", "研发费用", "生产", "制造费用"];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsExpenseTypeOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const openPicker = (ref: React.RefObject<HTMLInputElement>) => {
    if (ref.current) {
      if ('showPicker' in ref.current) {
        ref.current.showPicker();
      } else {
        ref.current.focus();
      }
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedRows(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const navItems = [
    { name: '员工自助', icon: <Users size={16} /> },
    { name: '应知应会', icon: <BookOpen size={16} /> },
    { name: '流程中心', icon: <GitBranch size={16} /> },
    { name: '流程申请', icon: <FileText size={16} />, hasSub: true },
    { name: '薪酬发放数据处理', icon: <DollarSign size={16} />, hasSub: true },
    { name: '组织与人才盘点', icon: <LayoutGrid size={16} />, hasSub: true },
    { name: '调薪模块', icon: <Briefcase size={16} />, hasSub: true },
    { name: '奖金模块', icon: <Gift size={16} />, hasSub: true },
    { name: '招聘管理', icon: <UserPlus size={16} />, hasSub: true },
    { name: '离职管理', icon: <UserMinus size={16} />, hasSub: true },
    { 
      name: '预算管理', 
      icon: <PieChart size={16} />, 
      hasSub: true,
      subItems: [
        { name: '预实分析报表-月度实际', icon: <FileText size={14} /> },
        { name: '预实分析报表-月度累计', icon: <Layers size={14} /> },
        { name: '预实分析报表-季度', icon: <CalendarRange size={14} /> }
      ]
    },
  ];


  return (
    <div className="flex h-screen bg-white font-sans overflow-hidden">
      <div className="watermark" />
      
      {/* Sidebar */}
      <aside className="w-56 bg-gray-50 border-r border-gray-200 flex flex-col z-10 shrink-0">
        <nav className="flex-1 overflow-y-auto py-2">
          {navItems.map((item) => (
            <div key={item.name}>
              <button 
                onClick={() => setActiveMenu(item.name)}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${activeMenu === item.name ? 'text-blue-600 bg-blue-50/50' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.name}</span>
                </div>
                {item.hasSub && (
                  activeMenu === item.name ? <ChevronDown size={14} /> : <ChevronRight size={14} />
                )}
              </button>
              
              {item.name === '预算管理' && activeMenu === '预算管理' && item.subItems && (
                <div className="bg-white/50 border-y border-gray-100/50">
                  {item.subItems.map(sub => (
                    <button 
                      key={typeof sub === 'string' ? sub : sub.name}
                      onClick={() => setActiveSubMenu(typeof sub === 'string' ? sub : sub.name)}
                      className={`w-full flex items-center gap-2 pl-12 pr-4 py-2 text-xs transition-all duration-200 ${
                        activeSubMenu === (typeof sub === 'string' ? sub : sub.name) 
                        ? 'text-blue-600 font-medium bg-blue-50/30' 
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {typeof sub !== 'string' && <span className="opacity-70">{sub.icon}</span>}
                      <span className="truncate">{typeof sub === 'string' ? sub : sub.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Header Title */}
        <header className="px-6 py-4 border-b border-gray-100">
          <h1 className="text-xl font-medium text-gray-800">{activeSubMenu}</h1>
        </header>

        <div className="p-4 px-6 flex items-center justify-between bg-white relative z-[60] border-b border-gray-50">
          <div className="flex items-center gap-3 flex-wrap">
            {activeSubMenu.includes('季度') ? (
              <>
                {/* Quarterly specific filters */}
                <div className="relative flex items-center">
                  <select 
                    value={budgetYear}
                    onChange={(e) => setBudgetYear(e.target.value)}
                    className={`pl-3 pr-10 py-1.5 text-sm border border-gray-200 rounded w-32 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none appearance-none bg-white transition-colors cursor-pointer ${!budgetYear ? 'text-gray-400' : 'text-gray-800 font-medium'}`}
                  >
                    <option value="" disabled hidden>预算年度</option>
                    {['2022', '2023', '2024', '2025'].map(year => (
                      <option key={year} value={year} className="text-gray-800">{year}年</option>
                    ))}
                  </select>
                  {budgetYear ? (
                    <X 
                      className="absolute right-3 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors bg-white" 
                      size={14} 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setBudgetYear('');
                      }}
                    />
                  ) : (
                    <Calendar className="absolute right-3 text-gray-400 pointer-events-none" size={16} />
                  )}
                  {!budgetYear && <span className="absolute left-3 text-sm text-gray-400 pointer-events-none">预算年度</span>}
                </div>

                <div className="relative flex items-center">
                  <select 
                    value={selectedQuarter}
                    onChange={(e) => setSelectedQuarter(e.target.value)}
                    className={`pl-3 pr-10 py-1.5 text-sm border border-gray-200 rounded w-36 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none appearance-none bg-white transition-colors cursor-pointer ${!selectedQuarter ? 'text-gray-400' : 'text-gray-800 font-medium'}`}
                  >
                    <option value="" disabled hidden>季度</option>
                    {['第一季度', '第二季度', '第三季度', '第四季度'].map(q => (
                      <option key={q} value={q} className="text-gray-800">{q}</option>
                    ))}
                  </select>
                  {selectedQuarter ? (
                    <X 
                      className="absolute right-3 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors bg-white" 
                      size={14} 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setSelectedQuarter('');
                      }}
                    />
                  ) : (
                    <ChevronDown className="absolute right-3 text-gray-400 pointer-events-none" size={16} />
                  )}
                  {!selectedQuarter && <span className="absolute left-3 text-sm text-gray-400 pointer-events-none">季度</span>}
                </div>
              </>
            ) : (
              <>
                {activeSubMenu !== '预实分析报表-月度实际' && (
                  <div className="relative flex items-center group">
                    <input 
                      ref={budgetDateRef}
                      type="month" 
                      value={budgetDate}
                      onChange={(e) => setBudgetDate(e.target.value)}
                      onClick={() => openPicker(budgetDateRef)}
                      className={`pl-3 pr-10 py-1.5 text-sm border border-gray-200 rounded w-40 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors appearance-none bg-white ${!budgetDate ? 'text-transparent' : 'text-gray-800'}`} 
                    />
                    {!budgetDate && (
                      <span 
                        className="absolute left-3 text-sm text-gray-400 pointer-events-none"
                      >
                        预算年月
                      </span>
                    )}
                    <Calendar 
                      className="absolute right-3 text-gray-400 cursor-pointer hover:text-blue-500 transition-colors" 
                      size={16} 
                      onClick={(e) => {
                        e.stopPropagation();
                        openPicker(budgetDateRef);
                      }}
                    />
                  </div>
                )}
                <div className="relative flex items-center group">
                  <input 
                    ref={actualDateRef}
                    type="month" 
                    value={actualDate}
                    onChange={(e) => setActualDate(e.target.value)}
                    onClick={() => openPicker(actualDateRef)}
                    className={`pl-3 pr-10 py-1.5 text-sm border border-gray-200 rounded w-40 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors appearance-none bg-white ${!actualDate ? 'text-transparent' : 'text-gray-800'}`} 
                  />
                  {!actualDate && (
                    <span 
                      className="absolute left-3 text-sm text-gray-400 pointer-events-none"
                    >
                      实际年月
                    </span>
                  )}
                  <Calendar 
                    className="absolute right-3 text-gray-400 cursor-pointer hover:text-blue-500 transition-colors" 
                    size={16} 
                    onClick={(e) => {
                      e.stopPropagation();
                      openPicker(actualDateRef);
                    }}
                  />
                </div>
              </>
            )}
            <div className="relative flex items-center">
              <input type="text" placeholder="部门" className="pl-3 pr-10 py-1.5 text-sm border border-gray-200 rounded w-44 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors" />
              <Search className="absolute right-3 text-gray-400" size={16} />
            </div>

            {/* Expense Type Multi-select */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsExpenseTypeOpen(!isExpenseTypeOpen)}
                className="px-3 py-1.5 text-sm border border-gray-200 rounded w-40 flex items-center justify-between bg-white hover:border-blue-500 transition-colors"
                id="expense-type-filter"
              >
                <span className={`truncate ${selectedExpenseTypes.length > 0 ? 'text-gray-800' : 'text-gray-400'}`}>
                  {selectedExpenseTypes.length > 0 ? selectedExpenseTypes.join(', ') : '费用类型'}
                </span>
                <ChevronDown size={14} className={`transition-transform text-gray-400 ${isExpenseTypeOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {isExpenseTypeOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded shadow-lg z-[70] py-1 min-w-[160px]"
                  >
                    {expenseTypes.map(type => (
                      <label key={type} className="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-50 cursor-pointer text-sm">
                        <input 
                          type="checkbox" 
                          checked={selectedExpenseTypes.includes(type)}
                          onChange={() => {
                            setSelectedExpenseTypes(prev => 
                              prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
                            );
                          }}
                          className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                        />
                        <span className="text-gray-700">{type}</span>
                      </label>
                    ))}
                    {selectedExpenseTypes.length > 0 && (
                      <div className="border-t border-gray-100 mt-1 pt-1 px-3">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedExpenseTypes([]);
                          }}
                          className="text-[10px] text-blue-600 hover:underline"
                        >
                          清除
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          <div className="flex items-center gap-3 text-sm shrink-0">
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-gray-600 hover:text-blue-600 transition-colors border border-transparent hover:border-blue-100 rounded">
              <Download size={16} />
              <span>下载</span>
            </button>
            <button className="flex items-center gap-1.5 px-4 py-1.5 text-blue-600 border border-blue-200 rounded hover:bg-blue-50 transition-colors">
              <RotateCcw size={16} />
              <span>重置</span>
            </button>
            <button className="flex items-center gap-1.5 px-6 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors shadow-sm">
              <Search size={16} />
              <span>查询</span>
            </button>
          </div>
        </div>

        {/* Table Container */}
        <div className="flex-1 overflow-auto bg-white border border-gray-200 rounded-lg">
          {activeSubMenu.includes('实际') || activeSubMenu.includes('累计') || activeSubMenu.includes('季度') ? (
            <table className={`w-full border-separate border-spacing-0 bg-white table-fixed ${
              activeSubMenu === '预实分析报表-月度实际' ? 'min-w-[1200px]' : 
              activeSubMenu === '预实分析报表-月度累计' ? 'min-w-[4500px]' : 
              'min-w-[4000px]'
            }`}>
            <thead className="sticky top-0 z-40 bg-white">
              {activeSubMenu === '预实分析报表-月度累计' ? (
                <>
                  <tr className="bg-gray-50 h-[40px]">
                    <th rowSpan={2} className="w-[150px] h-[80px] px-4 py-0 text-xs font-medium text-gray-500 border-r border-b border-gray-200 sticky top-0 left-0 z-50 bg-gray-50">一级部门</th>
                    <th rowSpan={2} className="w-[150px] h-[80px] px-4 py-0 text-xs font-medium text-gray-500 border-r border-b border-gray-200 sticky top-0 left-[150px] z-50 bg-gray-50">二级部门</th>
                    <th rowSpan={2} className="w-[150px] h-[80px] px-4 py-0 text-xs font-medium text-gray-500 border-r border-b border-gray-200 sticky top-0 left-[300px] z-50 bg-gray-50">三级部门</th>
                    <th colSpan={5} className="px-4 py-0 h-[40px] text-xs font-medium text-gray-500 border-r border-b border-gray-200 text-center sticky top-0 bg-gray-50 shadow-[inset_0_-1px_0_#e5e7eb]">HC</th>
                    <th colSpan={5} className="px-4 py-0 h-[40px] text-xs font-medium text-gray-500 border-r border-b border-gray-200 text-center sticky top-0 bg-gray-50 shadow-[inset_0_-1px_0_#e5e7eb]">人工成本</th>
                    <th colSpan={2} className="px-4 py-0 h-[40px] text-xs font-medium text-gray-500 border-r border-b border-gray-200 text-center sticky top-0 bg-gray-50 shadow-[inset_0_-1px_0_#e5e7eb]">人工成本（战略）</th>
                    <th colSpan={2} className="px-4 py-0 h-[40px] text-xs font-medium text-gray-500 border-r border-b border-gray-200 text-center sticky top-0 bg-gray-50 shadow-[inset_0_-1px_0_#e5e7eb]">折合人数</th>
                    <th colSpan={2} className="px-4 py-0 h-[40px] text-xs font-medium text-gray-500 border-r border-b border-gray-200 text-center sticky top-0 bg-gray-50 shadow-[inset_0_-1px_0_#e5e7eb]">人均人工成本</th>
                    <th colSpan={2} className="px-4 py-0 h-[40px] text-xs font-medium text-gray-500 border-r border-b border-gray-200 text-center sticky top-0 bg-gray-50 shadow-[inset_0_-1px_0_#e5e7eb]">营收</th>
                    <th colSpan={2} className="px-4 py-0 h-[40px] text-xs font-medium text-gray-500 border-r border-b border-gray-200 text-center sticky top-0 bg-gray-50 shadow-[inset_0_-1px_0_#e5e7eb]">毛利</th>
                    <th colSpan={2} className="px-4 py-0 h-[40px] text-xs font-medium text-gray-500 border-r border-b border-gray-200 text-center sticky top-0 bg-gray-50 shadow-[inset_0_-1px_0_#e5e7eb]">EBIT</th>
                    <th colSpan={2} className="px-4 py-0 h-[40px] text-xs font-medium text-gray-500 border-r border-b border-gray-200 text-center sticky top-0 bg-gray-50 shadow-[inset_0_-1px_0_#e5e7eb]">人均营收</th>
                    <th colSpan={2} className="px-4 py-0 h-[40px] text-xs font-medium text-gray-500 border-r border-b border-gray-200 text-center sticky top-0 bg-gray-50 shadow-[inset_0_-1px_0_#e5e7eb]">人均毛利</th>
                    <th colSpan={2} className="px-4 py-0 h-[40px] text-xs font-medium text-gray-500 border-r border-b border-gray-200 text-center sticky top-0 bg-gray-50 shadow-[inset_0_-1px_0_#e5e7eb]">人均EBIT</th>
                    <th colSpan={2} className="px-4 py-0 h-[40px] text-xs font-medium text-gray-500 border-r border-b border-gray-200 text-center sticky top-0 bg-gray-50 shadow-[inset_0_-1px_0_#e5e7eb]">元均营收</th>
                    <th colSpan={2} className="px-4 py-0 h-[40px] text-xs font-medium text-gray-500 border-r border-b border-gray-200 text-center sticky top-0 bg-gray-50 shadow-[inset_0_-1px_0_#e5e7eb]">元均毛利</th>
                    <th colSpan={2} className="px-4 py-0 h-[40px] text-xs font-medium text-gray-500 border-r border-b border-gray-200 text-center sticky top-0 bg-gray-50 shadow-[inset_0_-1px_0_#e5e7eb]">元均EBIT</th>
                  </tr>
                  <tr className="bg-gray-50 text-center h-[40px]">
                    {/* HC */}
                    {['预算HC', '预算HC同比增长率', '实际HC', '实际HC同比增长率', '满编率'].map(h => <th key={h} className="px-1 py-0 h-[40px] text-[10px] font-medium text-gray-500 border-r border-b border-gray-200 sticky top-[40px] bg-gray-50 min-w-[100px]">{h}</th>)}
                    {/* Labor Cost */}
                    {['预算', '预算同比增长率', '实际', '实际同比增长率', '执行率'].map(h => <th key={h} className="px-1 py-0 h-[40px] text-[10px] font-medium text-gray-500 border-r border-b border-gray-200 sticky top-[40px] bg-gray-50 min-w-[110px]">{h}</th>)}
                    {/* Strategic */}
                    {['预算', '实际'].map(h => <th key={h} className="px-1 py-0 h-[40px] text-[10px] font-medium text-gray-500 border-r border-b border-gray-200 sticky top-[40px] bg-gray-50 min-w-[150px]">{h}</th>)}
                    {/* FTE */}
                    {['预算折合人数', '实际折合人数'].map(h => <th key={h} className="px-1 py-0 h-[40px] text-[10px] font-medium text-gray-500 border-r border-b border-gray-200 sticky top-[40px] bg-gray-50 min-w-[120px]">{h}</th>)}
                    {/* Per Capita */}
                    {['预算人均人工成本', '实际人均人工成本'].map(h => <th key={h} className="px-1 py-0 h-[40px] text-[10px] font-medium text-gray-500 border-r border-b border-gray-200 sticky top-[40px] bg-gray-50 min-w-[160px]">{h}</th>)}
                    {/* Financials (Rev, GP, EBIT x Budget/Actual) */}
                    {Array(9).fill(['预算', '实际']).flat().map((h, i) => (
                      <th key={i} className="px-1 py-0 h-[40px] text-[10px] font-medium text-gray-500 sticky top-[40px] bg-gray-50 border-r border-b border-gray-200 min-w-[160px]">{h}</th>
                    ))}
                  </tr>
                </>
              ) : activeSubMenu.includes('季度') ? (
                <>
                  <tr className="bg-gray-50 h-[40px]">
                    <th rowSpan={2} className="w-[150px] h-[80px] px-4 py-0 text-xs font-medium text-gray-500 border-r border-b border-gray-200 sticky top-0 left-0 z-50 bg-gray-50">一级部门</th>
                    <th colSpan={3} className="px-4 py-0 h-[40px] text-xs font-medium text-gray-500 border-r border-b border-gray-200 text-center sticky top-0 bg-gray-50 shadow-[inset_0_-1px_0_#e5e7eb]">HC</th>
                    <th colSpan={3} className="px-4 py-0 h-[40px] text-xs font-medium text-gray-500 border-r border-b border-gray-200 text-center sticky top-0 bg-gray-50 shadow-[inset_0_-1px_0_#e5e7eb]">季度人工成本</th>
                    <th colSpan={2} className="px-4 py-0 h-[40px] text-xs font-medium text-gray-500 border-r border-b border-gray-200 text-center sticky top-0 bg-gray-50 shadow-[inset_0_-1px_0_#e5e7eb]">季度折合人数</th>
                    <th colSpan={2} className="px-4 py-0 h-[40px] text-xs font-medium text-gray-500 border-r border-b border-gray-200 text-center sticky top-0 bg-gray-50 shadow-[inset_0_-1px_0_#e5e7eb]">季度人均人工成本</th>
                    <th colSpan={2} className="px-4 py-0 h-[40px] text-xs font-medium text-gray-500 border-r border-b border-gray-200 text-center sticky top-0 bg-gray-50 shadow-[inset_0_-1px_0_#e5e7eb]">季度营收</th>
                    <th colSpan={2} className="px-4 py-0 h-[40px] text-xs font-medium text-gray-500 border-r border-b border-gray-200 text-center sticky top-0 bg-gray-50 shadow-[inset_0_-1px_0_#e5e7eb]">季度毛利</th>
                    <th colSpan={2} className="px-4 py-0 h-[40px] text-xs font-medium text-gray-500 border-r border-b border-gray-200 text-center sticky top-0 bg-gray-50 shadow-[inset_0_-1px_0_#e5e7eb]">季度EBIT</th>
                    <th colSpan={2} className="px-4 py-0 h-[40px] text-xs font-medium text-gray-500 border-r border-b border-gray-200 text-center sticky top-0 bg-gray-50 shadow-[inset_0_-1px_0_#e5e7eb]">季度人均营收</th>
                    <th colSpan={2} className="px-4 py-0 h-[40px] text-xs font-medium text-gray-500 border-r border-b border-gray-200 text-center sticky top-0 bg-gray-50 shadow-[inset_0_-1px_0_#e5e7eb]">季度人均毛利</th>
                    <th colSpan={2} className="px-4 py-0 h-[40px] text-xs font-medium text-gray-500 border-r border-b border-gray-200 text-center sticky top-0 bg-gray-50 shadow-[inset_0_-1px_0_#e5e7eb]">季度人均EBIT</th>
                    <th colSpan={2} className="px-4 py-0 h-[40px] text-xs font-medium text-gray-500 border-r border-b border-gray-200 text-center sticky top-0 bg-gray-50 shadow-[inset_0_-1px_0_#e5e7eb]">季度元均营收</th>
                    <th colSpan={2} className="px-4 py-0 h-[40px] text-xs font-medium text-gray-500 border-r border-b border-gray-200 text-center sticky top-0 bg-gray-50 shadow-[inset_0_-1px_0_#e5e7eb]">季度元均毛利</th>
                    <th colSpan={2} className="px-4 py-0 h-[40px] text-xs font-medium text-gray-500 border-r border-b border-gray-200 text-center sticky top-0 bg-gray-50 shadow-[inset_0_-1px_0_#e5e7eb]">季度元均EBIT</th>
                  </tr>
                  <tr className="bg-gray-50 text-center h-[40px]">
                    <th className="px-2 py-0 h-[40px] text-xs font-medium text-gray-500 border-r border-b border-gray-200 sticky top-[40px] bg-gray-50 min-w-[100px]">预算HC</th>
                    <th className="px-2 py-0 h-[40px] text-xs font-medium text-gray-500 border-r border-b border-gray-200 sticky top-[40px] bg-gray-50 min-w-[140px]">截止本季度实际HC</th>
                    <th className="px-2 py-0 h-[40px] text-xs font-medium text-gray-500 border-r border-b border-gray-200 sticky top-[40px] bg-gray-50 min-w-[100px]">满编率</th>
                    
                    <th className="px-2 py-0 h-[40px] text-xs font-medium text-gray-500 border-r border-b border-gray-200 sticky top-[40px] bg-gray-50 min-w-[140px]">预算</th>
                    <th className="px-2 py-0 h-[40px] text-xs font-medium text-gray-500 border-r border-b border-gray-200 sticky top-[40px] bg-gray-50 min-w-[140px]">实际</th>
                    <th className="px-2 py-0 h-[40px] text-xs font-medium text-gray-500 border-r border-b border-gray-200 sticky top-[40px] bg-gray-50 min-w-[100px]">执行率</th>
                    
                    <th className="px-2 py-0 h-[40px] text-xs font-medium text-gray-500 border-r border-b border-gray-200 sticky top-[40px] bg-gray-50 min-w-[140px]">预算折合人数</th>
                    <th className="px-2 py-0 h-[40px] text-xs font-medium text-gray-500 border-r border-b border-gray-200 sticky top-[40px] bg-gray-50 min-w-[140px]">实际折合人数</th>
                    
                    <th className="px-2 py-0 h-[40px] text-xs font-medium text-gray-500 border-r border-b border-gray-200 sticky top-[40px] bg-gray-50 min-w-[160px]">预算人均人工成本</th>
                    <th className="px-2 py-0 h-[40px] text-xs font-medium text-gray-500 border-r border-b border-gray-200 sticky top-[40px] bg-gray-50 min-w-[160px]">实际人均人工成本</th>

                    {/* Financials (9 groups x 2 columns each) */}
                    {Array(9).fill(['预算', '实际']).flat().map((h, i) => (
                      <th key={i} className="px-2 py-0 h-[40px] text-xs font-medium text-gray-500 border-r border-b border-gray-200 sticky top-[40px] bg-gray-50 min-w-[160px]">{h}</th>
                    ))}
                  </tr>
                </>
              ) : (
                <tr className="bg-gray-50 text-center h-[52px]">
                  <th className="w-[180px] h-[52px] px-4 py-0 text-xs font-medium text-gray-500 border-r border-b border-gray-200 sticky top-0 left-0 z-50 bg-gray-50">一级部门</th>
                  <th className="w-[180px] h-[52px] px-4 py-0 text-xs font-medium text-gray-500 border-r border-b border-gray-200 sticky top-0 left-[180px] z-50 bg-gray-50">二级部门</th>
                  <th className="w-[180px] h-[52px] px-4 py-0 text-xs font-medium text-gray-500 border-r border-b border-gray-200 sticky top-0 left-[360px] z-50 bg-gray-50">三级部门</th>
                  {activeSubMenu !== '预实分析报表-月度实际' && <th className="min-w-[100px] h-[52px] px-2 py-0 text-xs font-medium text-gray-500 border-r border-b border-gray-200 sticky top-0 bg-gray-50 shadow-[inset_0_-1px_0_#e5e7eb]">预算HC</th>}
                  <th className="min-w-[100px] h-[52px] px-2 py-0 text-xs font-medium text-gray-500 border-r border-b border-gray-200 sticky top-0 bg-gray-50 shadow-[inset_0_-1px_0_#e5e7eb]">实际HC</th>
                  {activeSubMenu !== '预实分析报表-月度实际' && <th className="min-w-[100px] h-[52px] px-2 py-0 text-xs font-medium text-gray-500 border-r border-b border-gray-200 sticky top-0 bg-gray-50 shadow-[inset_0_-1px_0_#e5e7eb]">满编率</th>}
                  
                  {activeSubMenu !== '预实分析报表-月度实际' && <th className="min-w-[140px] h-[52px] px-2 py-0 text-xs font-medium text-gray-500 border-r border-b border-gray-200 sticky top-0 bg-gray-50 shadow-[inset_0_-1px_0_#e5e7eb]">预算人工成本</th>}
                  <th className="min-w-[140px] h-[52px] px-2 py-0 text-xs font-medium text-gray-500 border-r border-b border-gray-200 sticky top-0 bg-gray-50 shadow-[inset_0_-1px_0_#e5e7eb]">实际人工成本</th>
                  {activeSubMenu !== '预实分析报表-月度实际' && <th className="min-w-[100px] h-[52px] px-2 py-0 text-xs font-medium text-gray-500 border-r border-b border-gray-200 sticky top-0 bg-gray-50 shadow-[inset_0_-1px_0_#e5e7eb]">执行率</th>}
                  
                  {activeSubMenu !== '预实分析报表-月度实际' && <th className="min-w-[120px] h-[52px] px-2 py-0 text-xs font-medium text-gray-500 border-r border-b border-gray-200 sticky top-0 bg-gray-50 shadow-[inset_0_-1px_0_#e5e7eb]">预算折合人数</th>}
                  <th className="min-w-[120px] h-[52px] px-2 py-0 text-xs font-medium text-gray-500 border-r border-b border-gray-200 sticky top-0 bg-gray-50 shadow-[inset_0_-1px_0_#e5e7eb]">实际折合人数</th>
                  
                  {activeSubMenu !== '预实分析报表-月度实际' && <th className="min-w-[160px] h-[52px] px-2 py-0 text-xs font-medium text-gray-500 border-r border-b border-gray-200 sticky top-0 bg-gray-50 shadow-[inset_0_-1px_0_#e5e7eb]">预算人均人工成本</th>}
                  <th className="min-w-[160px] h-[52px] px-2 py-0 text-xs font-medium text-gray-500 border-b border-gray-200 sticky top-0 bg-gray-50 shadow-[inset_0_-1px_0_#e5e7eb]">实际人均人工成本</th>
                </tr>
              )}
            </thead>
              <tbody className="text-sm">
                {INITIAL_DATA.map(row => (
                  <RowRender 
                    key={row.id} 
                    row={row} 
                    expandedRows={expandedRows} 
                    toggleExpand={toggleExpand} 
                    activeSubMenu={activeSubMenu}
                  />
                ))}
              </tbody>
            </table>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400 bg-white m-2 rounded border border-dashed border-gray-200">
              <div className="text-center">
                <FileBarChart size={48} className="mx-auto mb-2 opacity-20" />
                <p>正在开发中: {activeSubMenu}</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
